import * as React from 'react';
import * as TextStyle from '../../Style/TextStyle';



const RecipesGroup = ({recipesGroup, pantryUpdater, group_description}) => {

    /* When the user click on the link, we trigger this function. Change happens in the state pantryFlow in the App: 
        - we collect the id of the recipe selected in the payload. 
        - As a result we display the right recipe with the Component RecipeDetails.
    */
    const pickedRecipeHandler = (recipe) => {
        console.log(recipe)
        pantryUpdater({
            type : "RECIPE_PICKED",
            recipe : recipe
        })
    };


    return (
        <div>
            {/* This conditional is useful when we use this component inside SearchRecipes.jsx */}
            <TextStyle.Recipe_group_title>{!recipesGroup.title ? ("Recipes Found") : (recipesGroup.title)}</TextStyle.Recipe_group_title>
            <TextStyle.Recipes_group_description>{group_description}</TextStyle.Recipes_group_description>
            {/* A map to get all the recipes and their properties*/}
             {recipesGroup.recipes.map(meal => (
                <a onClick = { () => {pickedRecipeHandler(meal)}} key = {meal._id}>
                    <div>
                        <TextStyle.Recipe_available_title>{meal.name}</TextStyle.Recipe_available_title>
                        <div>
                            <TextStyle.Recipe_available_spec>Style: {meal.style.name}</TextStyle.Recipe_available_spec>
                            <TextStyle.Recipe_available_spec>Difficulty: {meal.difficulty}</TextStyle.Recipe_available_spec>
                            <TextStyle.Recipe_available_spec>Main Ingredient: {meal.mainIngredient.name}</TextStyle.Recipe_available_spec>
                        </div>
                    </div>
                </a>
            ))} 
        </div>
    );
}
 
export default RecipesGroup;