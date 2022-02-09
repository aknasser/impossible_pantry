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



  const [userAccount, setUserAccount] = useFetchModel(`${API_ENDPOINT}/users/61f4177d24a645a57a111aca`);
  const [categories, dispatchCategories] = useFetchModel(`${API_ENDPOINT}/categories`);  // All the entries for the Categories model.
  const [recipes, dispatchRecipes] = useFetchModel(`${API_ENDPOINT}/recipes`);; // All the entries fort the Recipes model
  const [ingredients, dispatchIngredients] = useFetchModel(`${API_ENDPOINT}/ingredients`);;
  const [styles, dispatchStyles] = useFetchModel(`${API_ENDPOINT}/styles`);;
 
 
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
              <Home/>
            </Route>

  {/* YOUR KITCHEN */}
            <Route path = "/yourkitchen">
              {categories.isLoading || categories.content===""  ? (
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