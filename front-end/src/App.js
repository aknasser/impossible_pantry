import * as React from 'react';
import Navbar from './Components/NavAndFoot/NavBar'
import Footer from './Components/NavAndFoot/Footer'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  // Necessary to use the router with React
import Home from './Components/Homepage/Home';
import Pantry from './Components/InsideYourKitchen/Selection/Pantry';
import RecipesAvailable from './Components/InsideYourKitchen/Results/RecipesAvailable';
import SearchRecipes from './Components/IWannaEat/SearchRecipes';
import RecipeDetails from './Components/Recipe/RecipeDetails';
import UserContext from './Context/UserContext';
import useFetchModel from './CustomHooks/useFetchModel';
import Admin from './Components/CRUD/Admin';
import Login from './Components/UserMgmt/Login'
import UserDashboard from './Components/UserMgmt/UserDashboard'
import axios from "axios";
import MainStyle from "./Style/MainStyle"
import StyleContext from "./Context/StyleContext"
import * as TextStyle from './Style/TextStyle';
import * as ButtonStyle from './Style/ButtonStyle';

import NotFound from "./Components/NotFound"

const App = () => {
 
  const API_ENDPOINT = "http://localhost:1993"

// To fetch the data related to these data models.
  const [categories, dispatchCategories] = useFetchModel(`${API_ENDPOINT}/categories`);  // All the entries for the Categories model.
  const [recipes, dispatchRecipes] = useFetchModel(`${API_ENDPOINT}/recipes`); // All the entries fort the Recipes model
  const [ingredients, dispatchIngredients] = useFetchModel(`${API_ENDPOINT}/ingredients`);
  const [styles, dispatchStyles] = useFetchModel(`${API_ENDPOINT}/styles`);
  const [users, dispatchUsers] = useFetchModel(`${API_ENDPOINT}/users`);




  // USER ACCOUNT MGMT IN THE APP. Initially value = userAccount.

  // 1 - We create the useState. We will use to manage and update the state in the App.
  const [userAccount, setUserAccount] = React.useState({
      user_details: {},
      token : null,
      isLoading : false  // Switch to "true" when we are checking the token and loading the user details from the DB 
  });

  // 2 - We encapsule userAccount and setUserAccount in the variable value. To improve the performane we use useMemo ==> The variable "value" is memoized as long as user userAccount remains the same.
  const value = React.useMemo(
    () => ({ userAccount, setUserAccount }), 
    [userAccount]
  ); 
  // 3 - Refresh token - Everytime we reload the page, we update / check the token to maintain the user session
  // Note that the useCallback is just here to "optimize the performance" (reduce the number of renders)
  const verify_user = React.useCallback(async() => {
    console.log("TRIGGERED!!!")
    // We are loading the user data and checking if the token is still "fresh"
    setUserAccount(oldValues => ({
      ...oldValues,
      isLoading : true,
    }))
    const token_refresher = await axios.post(`${API_ENDPOINT}/users/refreshToken`, null, {withCredentials : true}) // /!\ withCredentials is needed to send cookie to the server!!
    // If refreshToken find a valid token in the cookies and generate a new token , the status will be ok
    // We can update userAccount with this newToken 
    if (token_refresher.data.success) {
      console.log("TOKEN REFRESHED!")
      const user_data = await token_refresher.data.user_info;
      setUserAccount({       // With this syntax We keep the old value of the state and update it with the token
        user_details: user_data,
        token : token_refresher.data.token,
        isLoading : false
      })
    // If the status is not okay, we collect the message from the back-end and logout the user
    // To log out the user we set userAccount to "null"
    } else {
      console.log("heyo!")
      console.log(`${token_refresher.data.message}`)
      setUserAccount({
        user_details : {},
        token: null,
        isLoading : false
      })
      dispatchPantryFlow({  // TO LOG OUT the user
        type : "USER_LOGOUT"
      })
    }
    // Timer to Refresh token - every 5 minutes, we refresh the user Token (yeah verify_user is calling itself with a timer to create repetitive call).
    setTimeout(verify_user, 1000 * 60 *5);

  }, [setUserAccount]) 

// This effect is triggered when we launch the app. verify_user() repeat itself every 5mn(check the function statement above)
  React.useEffect (() => {
    verify_user()
  }, [verify_user]); 

  

  React.useEffect( () => {
    console.log(`USER ACCOUNT : ${JSON.stringify(userAccount)}`);
  }, [userAccount])

  // PANTRYFLOW : To check if the user has submitted his foodStock or picked a recipe among the choices available (in RecipesAvailabe )
  
  // In this object, we store the different stages of the pantry (for instance, homePage, user_dashboard, recipe_details, etc... )
  const pantry_stages = {
    main_page : "home",
    user_dashboard : "dashboard",
    food_stock : "pantry",
    recipes_available : "recipes_available",
    search_recipe : "search",
    recipe_details : "recipe"
  }


  const pantryReducer = (state, action) => {
    switch (action.type) {
      case "UI_FLOW": 
        return {
          ui_to_display : action.page_name,
          display_recipe : false, 
          recipeChosen : ""
        };

      case "RECIPE_PICKED": 
        return {
          ui_to_display : pantry_stages.recipe_details,
          display_recipe : true,
          recipeChosen : action.recipe
        }
      case "USER_LOGOUT": 
        return {
          ...state,
          user_main_page : false,
        };
    }
  };
  
  const [pantryFlow, dispatchPantryFlow] = React.useReducer(
    pantryReducer, 
    {
      ui_to_display : pantry_stages.main_page,
      display_recipe : false,
      recipeChosen : ""
    }
  );


React.useEffect( () => {
  console.log(`PANTRTFLOW STATE : ${JSON.stringify(pantryFlow)}`);
}, [pantryFlow])

  /* VALIDATION AND DUPLICATE FUNCTION
    We use these functions in Pantry and SearchRecipes. They enable us to control : 
      1 - the input typed by the user : The user can only ingredients available in our dataset
      2 - check the duplicate : The user can only submit an ingredient once 
  */
  
  // 1  - Validation Check
        // parameter 1 : validEntries : The array with all the accepted entries (countries, ingredients, style, difficulty)
        // parameter 2 :  stringToCheck : the stringTyped by the user.
        // Return... true if the ingredient match with one of ingredient of this category. Otherwise it returns false.

  const checkValidation = (validEntries, stringToCheck) =>  {
    for (let i = 0; i < validEntries.length; i++) {
        if (stringToCheck.toLowerCase() === validEntries[i].name.toLowerCase()) {
            console.log("We found a matching filter!"); 
            return true;      
        }
    }
    return false; 
  };

  // 2  - Duplicate Check
      // parameter 1 : validEntries : The array with all the accepted entries (countries, ingredients, style, difficulty)
      // parameter 2 :  stringToCheck : the stringTyped by the user.
      // Return... true if the ingredient match with one of ingredient of this category. Otherwise it returns false.

  const checkDuplicate = (arrayToCheck, stringToCheck) => {
    
    if (arrayToCheck.length <= 0) {    // If the arrayToCheck is empty, we can't have duplicate, duh!
      return true;
    }
    let hashTable = {};
    for (let element of arrayToCheck) {
      hashTable[element] = true;
    }
    if (hashTable[stringToCheck]) {
      console.log("Duplicate found!");
      return false;
    }
    return true;
  }

// STYLE CONTEXT
const [style, setStyle] = React.useState({
  color_theme : {
    primary_color : "rgb(25, 42, 81)", // Navy Blue
    secundary_color : "rgb(234, 224, 204)", // Cream
    third_color : "rgb(123, 62, 25)", // Dark brown
    drawing_color : "rgb(205, 236, 247)",  // light Blue
  }
});

const theme = {style, setStyle}



  return (
    <UserContext.Provider value = {value}>
      <StyleContext.Provider value = {theme}>
        <Router>
          <MainStyle/> {/* To import the global styles */}
          <Navbar
            endpoint = {API_ENDPOINT}
            pantryUpdater = {dispatchPantryFlow}
          />
            <Switch>

    {/* HOME */}
              <Route exact path = "/">
                  {pantryFlow.ui_to_display === pantry_stages.recipe_details ? (
                    <RecipeDetails
                      endpoint = {API_ENDPOINT}
                      recipe = {pantryFlow.recipeChosen}  // We get recipeChosenId when the user click on a recipe in RecipesAvailable.
                      go_to_recipe_featured = {dispatchPantryFlow}
                    />
                  ) : (
                    <Home
                    pantry_flow = {dispatchPantryFlow}
                    />
                  )}
              </Route>
          
    {/* YOUR KITCHEN
    3 CASES :
      a - categories and userAccount are still loading ==> Loading Message
      b - The User start the form. At this point pantryFlow is in its intial State the properties isSubmitted and recipesPicked are false ==> Display component Pantry
      c - The user just submitted the form. pantryFlow.isSubmmitted is now equal to true ==> Display component RecipesAvailable 
      d - The user clicked on a recipe to see the instructions / details, recipesPicked is now equalt to true ==> Display the recipes instructions.
      */}
      
              <Route path = "/yourkitchen">
                { pantryFlow.ui_to_display === pantry_stages.recipe_details ? (
                  <RecipeDetails
                    endpoint = {API_ENDPOINT}
                    recipe = {pantryFlow.recipeChosen}  // We get recipeChosenId when the user click on a recipe in RecipesAvailable.
                    go_to_recipe_featured = {dispatchPantryFlow}
                  />
                ) : pantryFlow.ui_to_display === pantry_stages.recipes_available ? (
                  <RecipesAvailable
                    endpoint = {API_ENDPOINT}
                    pantryUpdater = {dispatchPantryFlow}
                  />
                ) : pantryFlow.ui_to_display === pantry_stages.food_stock ? (
                  <Pantry
                    allCategories = {categories}  // All the categories except NO CATEGORY
                    endpoint = {API_ENDPOINT}
                    pantryUpdater = {dispatchPantryFlow}
                    checkValidation = {checkValidation}
                  />
                ) : !userAccount.token  ? (
                  <Login
                    endpoint = {API_ENDPOINT}
                    pantryUpdater = {dispatchPantryFlow}
                  />
                ) : userAccount.token  ? (
                  <UserDashboard
                    pantryUpdater = {dispatchPantryFlow}
                    endpoint = {API_ENDPOINT}
                  />
                ) : userAccount.isLoading ? (
                  <TextStyle.Loading_message>Loading...</TextStyle.Loading_message>
                ) : pantryFlow.ui_to_display === pantry_stages.recipe_details ? (
                  <RecipeDetails
                    endpoint = {API_ENDPOINT}
                    recipe = {pantryFlow.recipeChosen}  // We get recipeChosenId when the user click on a recipe in RecipesAvailable.
                    go_to_recipe_featured = {dispatchPantryFlow}
                  />
                ) : (
                  <p>Doggo</p>
                )
                }
              </Route>

    {/* I WANNA EAT */}
              <Route path = "/search">
                {recipes.isLoading || styles.isLoading || ingredients.isLoading  ? (
                    <TextStyle.Loading_message>Loading...</TextStyle.Loading_message>
                ) : pantryFlow.ui_to_display === pantry_stages.recipe_details ? (
                  <RecipeDetails
                    endpoint = {API_ENDPOINT}
                    recipe = {pantryFlow.recipeChosen}  // We get recipeChosenId when the user click on a recipe in RecipesAvailable.
                    go_to_recipe_featured = {dispatchPantryFlow}
                  />
                ) : (
                    <SearchRecipes
                      endpoint = {API_ENDPOINT}
                      allIngredients = {ingredients.content}
                      allStyles = {styles.content}
                      recipesUpdater = {dispatchPantryFlow}
                      checkValidation = {checkValidation}
                      checkDuplicate = {checkDuplicate}
                    />
                )}
              </Route>

    {/* RECIPES TBC (might be redundant) */}
              <Route path = "/recipe/:id">
                <RecipeDetails />
              </Route>


    {/* CRUD */}
              <Route path = "/admin">
                <Admin
                  endpoint = {API_ENDPOINT}
                  allCategories = {categories.content}
                  allIngredients = {ingredients.content}
                  allRecipes = {recipes.content}
                  allStyles = {styles.content}
                  allUsers = {users.content}
                />
              </Route>

    {/*NOT FOUND -404 */}
              <Route>
                <NotFound 
                  pantryUpdater = {dispatchPantryFlow}
                />
              </Route>
              
            </Switch>
          <Footer
            endpoint = {API_ENDPOINT}
            recipeTrigger = {dispatchPantryFlow} // to display the daily recipe when the user clicks on it.
          />
        </Router>
      </StyleContext.Provider>
    </UserContext.Provider>

  );
}
 
export default App;