import axios from "axios";
import * as React from 'react';
import StyleContext from "../../Context/StyleContext";
import UserContext from "../../Context/UserContext";
import * as DivStyle from "../../Style/DivStyle";
import * as PictureStyle from "../../Style/PictureStyle";
import Bookmark from "../../Style/SVG/Bookmark"
import Tick from "../../Style/SVG/Tick"


const BlocPicture = ({recipe, endpoint}) => {

    const {userAccount, setUserAccount} = React.useContext(UserContext)
    const {style, setStyle} = React.useContext(StyleContext)

    const [saved_recipe, set_saved_recipe] = React.useState({
        property_name : "recipesSaved",
        already_in_user: false
    });
    const [cooked_recipe, set_cooked_recipe] = React.useState({
        property_name : "recipesCooked",
        already_in_user: false
    });

    const [bookmark_color, set_bookmark_color] = React.useState();
    const [tick_color, set_tick_color] = React.useState(
        {
            fill : "",
            stroke : ""
        }
    );

    // TO CHECK IF THE RECIPE IS ALREADY PART OF THE PROPERTY "recipesSaved" or "recipesCooked"
    React.useEffect(() => {
        const check_recipes = async() => {
            // 1 - create and feed two hash tables with respectively recipesSaved and recipesCooked as key 
            const recipes_saved_ht = {};
            const recipes_cooked_ht = {};
            for (let recipe of userAccount.user_details.recipesSaved) {
                recipes_saved_ht[recipe] = true;
            };
            for (let recipe of userAccount.user_details.recipesCooked) {
                recipes_cooked_ht[recipe] = true;
            }
            
            // 2 - If the recipe id is part of these hashTable ==> the user has already saved or cooked this dish.
            if (recipes_saved_ht[recipe._id]) {
                console.log("already saved")
                set_saved_recipe({
                    ...saved_recipe,
                    already_in_user : true,
                })
                // we update the bookmark logo to show that the recipe has been already saved before
                set_bookmark_color(style.color_theme.primary_color);
            } else {
                set_bookmark_color(style.color_theme.drawing_color);
                console.log("first timer bookmarked ?")
            }
            if (recipes_cooked_ht[recipe._id]) {
                console.log("already cooked")
                set_cooked_recipe({
                    ...cooked_recipe,
                    already_in_user : true,
                })
                // we update the tick logo to show that the recipe has been already saved before
                set_tick_color({
                    fill : "rgb(0, 138, 11)",
                    stroke : "white",
                });
            } else {
                set_tick_color({
                    fill : "white",
                    stroke : "rgb(0, 138, 11)",
                });
                console.log("first timer cooked ?")
            }
        };
        if (userAccount.user_details.recipesSaved || userAccount.user_details.recipesSaved) {
            check_recipes();
        } 
    }, [recipe, userAccount.user_details])

    React.useEffect ( () => {
        console.log(JSON.stringify(saved_recipe));
        console.log(JSON.stringify(cooked_recipe));
    }, [saved_recipe, cooked_recipe])



    // TO ADD THIS RECIPE TO THE RECIPES SAVED PROPERTY FOR THE USER
    // param1: the category of recipe we want to update in the user object (recipesSaved or recipesCooked)
    // param2 : the state updater function for the recipe_category
    const bookmark_recipe = async(recipe_category, updater_recipe_category) => {
        // 1 - We create an object 
        const to_save_the_recipe = {
            recipe : recipe,
            user : userAccount.user_details,              // come from the user context
            type_of_recipe: recipe_category.property_name,
            already_in_user_recipes_property : recipe_category.already_in_user 
        }
        // 2 - Send it an axios.post request
        const adding_recipe_to_user = await axios.post(`${endpoint}/recipes/savedRecipe`, to_save_the_recipe);

        // 3 - If the update is successful...
        const response = adding_recipe_to_user.data;
        if (response.success) {
            // 3a - update the user_details with the data from the back-end.
            setUserAccount({
                ...userAccount,
                user_details: {
                    ...userAccount.user_details,
                    [recipe_category.property_name] : response.user[recipe_category.property_name]
                }
            })
            // 3b - the property "already_in_user" switch to the opposite (true to false and vice versa)
            // ==> After the action done above, the status of this recipe changed it's now in (or out of) the user object for the property targeted.
            updater_recipe_category({
                ...recipe_category,
                already_in_user : !recipe_category.already_in_user
            })

            // 3c - The color of the svg change. It happens when the user_details are updated thanks to the useEffect and its dependencies.
        };
    };

    return (
        <div>
            <PictureStyle.Dish_pic src={`recipe_details/recipes_pic/${recipe.pictureUrl}`} alt={recipe.name} />
            <DivStyle.Bookmark_and_tick>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.5 33.04" onClick={() => bookmark_recipe(saved_recipe, set_saved_recipe)}>
                    <Bookmark
                        fill_color={bookmark_color}    
                    />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77.82 77.82" onClick={() => bookmark_recipe(cooked_recipe, set_cooked_recipe)}>
                    <Tick
                        fill_color={tick_color.fill}
                        tick_color={tick_color.stroke}
                    />
                </svg>
            </DivStyle.Bookmark_and_tick>

            <DivStyle.Bookmark_and_tick>
                <span>{recipe.style.name}</span>
                <span>{recipe.country}</span>
            </DivStyle.Bookmark_and_tick>
        </div>
    );
}
 
export default BlocPicture;