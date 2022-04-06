import PageInstructions from "../SmallParts/PageInstructions";
import PageTitle from "../SmallParts/PageTitle";
import BlocPicture from "./BlocPicture"
import Steps from "./Steps"
import Suggestions from "./Suggestions"
import * as React from 'react';
import axios from "axios";


// reciped is required to send the good Id to the back-end
const RecipeDetails = ({endpoint, recipe, go_to_recipe_featured}) => {

    const [randomRecipes, setRandomRecipes] = React.useState([]);
    const [nmbrOfStars, setnmbrOfStars] = React.useState();

    // TO GET THE SUGGESTED RECIPES.
    React.useEffect( () => {
        const fetchSuggestedRecipes = async() => {
            try {
                const axiosGetFetch = await axios.get(`${endpoint}/recipes/recipesdetails/${recipe._id}`, {crossdomain : true})
                const suggestions = axiosGetFetch.data;
                setRandomRecipes(suggestions);

            } catch (e) {
                console.log (`oh scheiss, some issue to get the suggested recipes : ${e}`);
            }
        }
        fetchSuggestedRecipes();
    }, [endpoint, recipe._id]);


    // TO SET THE NUMBER OF STARS. We update the array nmbrOfStars below. The number of object depend on the difficulty.
    React.useEffect( () => {
            console.log(recipe.difficulty);
            const difficultyLevel = [];
            for (let i = 0; i < recipe.difficulty; i++) {
                difficultyLevel.push("aStar.jpg");
            }
            console.log(difficultyLevel);
            setnmbrOfStars(difficultyLevel);
    }, []);


    React.useEffect( () => {
        console.log(nmbrOfStars)
    }, [nmbrOfStars])
    return (
        <>
            <PageTitle title={recipe.name}/>
            <PageInstructions instructions={recipe.intro}/>
            <BlocPicture 
                recipe={recipe}
                endpoint = {endpoint}
            />

            {/* The number of star will depend on the number of the difficulty */}   
            {nmbrOfStars &&
                    <div>
                       <h4>Difficulty</h4>
                        {nmbrOfStars.map( (star, index) => (
                            <img src={star} alt="a shiny star" key= {index} />
                        ))}             
                   </div> 
            }
            <Steps recipeSteps={recipe.steps}/>

        {randomRecipes.map(mysteriousRecipe => (
            <Suggestions 
                randomRecipe={mysteriousRecipe}
                go_to_recipe_featured = {go_to_recipe_featured}
                key={mysteriousRecipe._id}
            />            
        ))}
        </>
    );
}
 
export default RecipeDetails;