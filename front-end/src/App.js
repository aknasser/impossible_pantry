import './App.css';
import * as React from 'react';
import Navbar from './Components/NavAndFoot/NavBar'
import Footer from './Components/NavAndFoot/Footer'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";  // Necessary to use the router with React
import Home from './Components/Homepage/Home';
import Pantry from './Components/InsideYourKitchen/Selection/Pantry';
import RecipesAvailable from './Components/InsideYourKitchen/Results/RecipesAvailable';
import SearchRecipes from './Components/IWannaEat/SearchRecipes';
import RecipeDetails from './Components/Recipe/RecipeDetails';
import NotFound from './Components/NotFound';
import UserContext from './Context/UserContext';
import useFetchModel from './CustomHooks/useFetchModel';


const App = () => {
 
  const API_ENDPOINT = "http://localhost:1993"

// To fetch the data related to these data models.
  const [userLogged, setUserLogged] = useFetchModel(`${API_ENDPOINT}/users/621137f1004a65cfd4fc4aee`);
  const [categories, dispatchCategories] = useFetchModel(`${API_ENDPOINT}/categories`);  // All the entries for the Categories model.
  const [recipes, dispatchRecipes] = useFetchModel(`${API_ENDPOINT}/recipes`);; // All the entries fort the Recipes model
  const [ingredients, dispatchIngredients] = useFetchModel(`${API_ENDPOINT}/ingredients`);;
  const [styles, dispatchStyles] = useFetchModel(`${API_ENDPOINT}/styles`);;
 

  // USER ACCOUNT MGMT IN THE APP. Initially value = userAccount.

  // 1 - We create the useState. We will use to manage and update the state in the App.
  const [userAccount, setUserAccount] = React.useState({});

  //2 - Use effect. Triggered when the value of the userLogged changes
  React.useEffect(() => {
    // a - we create userReady. When this value is true, we carry on with the update
    let userReady = true;
    if (userReady) {
      // b - We attribute to userAccount the value of the user Logged (fetched with the custom hook).
      setUserAccount(userLogged);
    };


    // c - CLEAN-UP FUNCTION - Triggered when the componnent is unmounted.
    return () => {
      // because userReady is false we don't update (yet) the value of userAccount
      userReady = false;
      console.log("user not ready yet in the useEffect");
    }
  }, [userLogged])


  //3 - We encapsule userAccount and setUserAccount in the variable value. To improve the performane we use useMemo ==> The variable "value" is memoized as long as user userAccount remains the same.
  const value = React.useMemo(
    () => ({ userAccount, setUserAccount }), 
    [userAccount]
  ); 



  // PANTRYFLOW : To check if the user has submitted his foodStock or picked a recipe among the choices available (in RecipesAvailabe )
  
  const pantryReducer = (state, action) => {
    switch (action.type) {
      case "FORM_SUBMITTED": 
        return {
          ...state,
          isSubmitted : true,
        };
      case "RECIPE_PICKED": 
        return {
          ...state,
          isSubmitted : false,
          recipesPicked : true,
          recipeChosen : action.payload
        }
    }
  };
  
  const [pantryFlow, dispatchPantryFlow] = React.useReducer(
    pantryReducer, 
    {isSubmitted : false, recipesPicked : false, recipeChosen : ""}
  );


  return (
    <UserContext.Provider value={value}>
      <Router>
        <Navbar/>
          <Switch>

  {/* HOME */}
            <Route exact path = "/">
              {/* This conditions is important : We are loading while userAccount get updated with the value of userLogged(from data fetched using the customHook) */}
              {userAccount.isLoading || !userAccount.content ? (
                  <p>Loading...</p>
                ) : (
                  <Home/>
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
              {categories.isLoading || categories.content===""  || userAccount.isLoading  ? (
                  <p>Loading...</p>
                ) : !pantryFlow.isSubmitted && !pantryFlow.recipesPicked ?   (
                  <Pantry 
                    allCategories = {categories}
                    endpoint = {API_ENDPOINT}
                    pantryUpdater = {dispatchPantryFlow}
                /> 
                ) : pantryFlow.isSubmitted ? (
                  <RecipesAvailable
                    endpoint = {API_ENDPOINT}
                    pantryUpdater = {dispatchPantryFlow}
                  />
                ) : pantryFlow.recipesPicked ? (
                  <RecipeDetails
                  endpoint = {API_ENDPOINT}
                  recipe = {pantryFlow.recipeChosen}  // We get recipeChosenId when the user click on a recipe in RecipesAvailable.
                  />
                ) : (
                  null
                )
              }
            </Route>

  {/* I WANNA EAT */}
            <Route path = "/search">
              {recipes.isLoading || styles.isLoading || ingredients.isLoading  ? (
                  <p>Loading...</p>
              ) : (
              <SearchRecipes
                allIngredients = {ingredients.content}
                allStyles = {styles.content}
              />
              )}

            </Route>

  {/* RECIPES */}
            <Route path = "/recipe/:id">
              <RecipeDetails />
            </Route>


  {/* CRUD */}
            <Route path = "recipe">
              <RecipeDetails/>
            </Route>

  {/*NOT FOUND -404 */}
            <Route>
              <NotFound/>
            </Route>

          </Switch>
        <Footer/>
      </Router>
    </UserContext.Provider>

  );
}
 
export default App;