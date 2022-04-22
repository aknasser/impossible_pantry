import PageInstructions from "../SmallParts/PageInstructions";
import PageTitle from "../SmallParts/PageTitle";
import BlocPicture from "./BlocPicture"
import Steps from "./Steps"
import Suggestions from "./Suggestions"
import * as React from 'react';
import axios from "axios";
import * as DivStyle from "../../Style/DivStyle";
import * as PictureStyle from "../../Style/PictureStyle";


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
                difficultyLevel.push("star.svg");
            }
            console.log(difficultyLevel);
            setnmbrOfStars(difficultyLevel);
    }, [recipe]);


    React.useEffect( () => {
        console.log(nmbrOfStars)
    }, [nmbrOfStars]);

    
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
                        <DivStyle.Difficulty_s_stars>
                        {nmbrOfStars.map( (star, index) => (
                            <div key= {index}>
                                <PictureStyle.Difficulty_star src={`recipe_details/${star}`} alt="a shiny star" key= {index} />
                            </div>

                        ))}             
                        </DivStyle.Difficulty_s_stars> 
                    </div>

            }
            <DivStyle.Ingredients_List_Recipe_Details>
                <h4>Ingredients List</h4>
                {recipe.ingredientsNeeded === undefined ? (
                    <p>Coming!!!</p>
                    ) : (
                        recipe.ingredientsNeeded.map(food => (
                            <span key= {food.ingredient._id}>{food.quantity}{food.ingredient.unit} {food.ingredient.name}</span>
                        ))
                    )
                }
            </DivStyle.Ingredients_List_Recipe_Details>
            <Steps recipeSteps={recipe.steps}/>
        
            <h3>Featured Recipes</h3>
            <DivStyle.Featured_recipes>
                {randomRecipes.map(mysteriousRecipe => (
                    <Suggestions 
                        randomRecipe={mysteriousRecipe}
                        go_to_recipe_featured = {go_to_recipe_featured}
                        key={mysteriousRecipe._id}
                    />            
                ))}
            </DivStyle.Featured_recipes>

        </>
    );
}
 
export default RecipeDetails;