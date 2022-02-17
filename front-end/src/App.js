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


  const [userLogged, setUserLogged] = useFetchModel(`${API_ENDPOINT}/users/620526c469cdb666b0b73bbf`);
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

  {/* YOUR KITCHEN */}
            <Route path = "/yourkitchen">
              {categories.isLoading || categories.content===""  || userAccount.isLoading   ? (
                <p>Loading...</p>
              ) : (
                <Pantry 
                  allCategories = {categories}
                  endpoint = {API_ENDPOINT}
                /> 
              )}
              
            </Route>
            <Route path = "/inspiration">
              <RecipesAvailable/>
            </Route>

  {/* I WANNA EAT */}
            <Route path = "/search">
              <SearchRecipes
                allRecipes = {recipes}
                allIngredients = {ingredients}
                allStyles = {styles}
              />
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