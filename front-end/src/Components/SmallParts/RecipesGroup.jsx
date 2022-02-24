import * as React from 'react';



const RecipesGroup = ({recipesGroup, pantryUpdater}) => {

    /* When the user click on the link, we trigger this function. Change happens in the state pantryFlow in the App: 
        - get recipePicked = true. 
        - we collect the id of the recipe selected in the payload. We will use it to display the right recipe with the Component RecipeDetails.
    */
    const pickedRecipeHandler = (recipeId) => {
        pantryUpdater({
            type : "RECIPE_PICKED",
            payload : recipeId
        })
    };

    return (

        
        <div>
            <h3>{recipesGroup.title}</h3>
            
            {/* A map to get all the recipes and their properties*/}
             {recipesGroup.recipes.map(meal => (
                <div key = {meal._id}>
                    <a onClick = { () => {pickedRecipeHandler(meal._id)}}>
                        <h4>{meal.name}</h4>
                    </a>
                        <span>Style: {meal.style.name}</span>
                        <span>Difficulty: {meal.difficulty}</span>
                        <span>Main Ingredient: {meal.mainIngredient.name}</span>
                </div>
            ))} 
        </div>
    );
}
 
export default RecipesGroup;