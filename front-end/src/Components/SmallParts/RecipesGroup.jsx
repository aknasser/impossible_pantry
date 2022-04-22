import * as React from 'react';
import * as TextStyle from '../../Style/TextStyle';
import * as DivStyle from '../../Style/DivStyle';



const RecipesGroup = ({recipesGroup, pantryUpdater, group_description, bg_color, width}) => {

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
        window.scrollTo({      
            top : 0,
            behavior :"smooth"
        })
    };


    return (
        <DivStyle.Recipe_found_block bg_color = {bg_color} width_big_screen={width}>
            {/* This conditional is useful when we use this component inside SearchRecipes.jsx */}
            <TextStyle.Recipe_group_title>{!recipesGroup.title ? (
                `${recipesGroup.recipes.length} Recipes Found`
                ) : (
                recipesGroup.title
                )}
            </TextStyle.Recipe_group_title>
            <TextStyle.Recipes_group_description>{group_description}</TextStyle.Recipes_group_description>
            {recipesGroup.recipes.length > 0 ? (
                recipesGroup.recipes.map(meal => (
                    <DivStyle.Recipe_block onClick = { () => {pickedRecipeHandler(meal)}} key = {meal._id}>
                        <div>
                            <TextStyle.Recipe_available_title>{meal.name}</TextStyle.Recipe_available_title>
                            <div>
                                <TextStyle.Recipe_available_spec>Style: {meal.style.name}</TextStyle.Recipe_available_spec>
                                <TextStyle.Recipe_available_spec>Difficulty: {meal.difficulty}</TextStyle.Recipe_available_spec>
                                <TextStyle.Recipe_available_spec>Main Ingredient: {meal.mainIngredient.name}</TextStyle.Recipe_available_spec>
                            </div>
                        </div>
                    </DivStyle.Recipe_block>
                )) 
            ) : (
                <TextStyle.Empty_category_message>Nada</TextStyle.Empty_category_message>
            )}

        </DivStyle.Recipe_found_block>
    );
}
 
export default RecipesGroup;