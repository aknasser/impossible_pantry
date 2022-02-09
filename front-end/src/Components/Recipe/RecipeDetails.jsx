import PageInstructions from "../SmallParts/PageInstructions";
import PageTitle from "../SmallParts/PageTitle";
import BlocPicture from "./BlocPicture"
import Steps from "./Steps"
import Suggestions from "./Suggestions"
import { useParams } from "react-router";


const RecipeDetails = () => {

    const { id } = useParams();  // permet de récupérer la valeur du paramètre utilisée pour arriver surc cette page

    const recipe = []; /* Choper with useRef de l'id or something. Gonna check later. */

    const randomRecipes = [];  // Use Effect (only during the first render []) to fetch 2 randoms recipes 

    return (
        <>
            <PageTitle title={recipe.name}/>
            <PageInstructions instructions={recipe.intro}/>
            <BlocPicture recipe={recipe}/>
            <div>
                <h4>Difficulty</h4>
{/* Here an array.map: The number of star will depend on the number of the difficulty */}                
            <img src="" alt="aStar.jpg" />
            </div>
            <Steps recipeSteps={recipe.steps}/>
{/* 1 - We fetch 2 randoms recipes from the API, we put them in an array 
    2 - We user array.map on this array.
    3 - Include some conditional rules like if randomRecipe._id = randomRecipe._id || randomRecipe_id = recipe_id ==> reset the fetch
*/}
        {randomRecipes.map(mysteriousRecipe => (
            <Suggestions randomRecipe={mysteriousRecipe}/>            
        ))}
        </>
    );
}
 
export default RecipeDetails;