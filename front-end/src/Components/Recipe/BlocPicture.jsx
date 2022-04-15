import axios from "axios";
import * as React from 'react';
import UserContext from "../../Context/UserContext";
import * as DivStyle from "../../Style/DivStyle";


const BlocPicture = ({recipe, endpoint}) => {

    const {userAccount, setUserAccount} = React.useContext(UserContext)

    const country = "";  // FETCH  THE COUNTRIES OBJECT IN THE DB CORRESPONDING TO recipe.country 
    const style = "";    // FETCH ALL THE STYLE IN THE DB CORRESPONDING TO recipe.style
 
    const [saved_recipe, set_saved_recipe] = React.useState({
        property_name : "recipesSaved",
        already_in_user: false
    });
    const [cooked_recipe, set_cooked_recipe] = React.useState({
        property_name : "recipesCooked",
        already_in_user: false
    });


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
            } else {
                console.log("first timer savedd ?")
            }
            if (recipes_cooked_ht[recipe._id]) {
                console.log("already cooked")
                set_cooked_recipe({
                    ...cooked_recipe,
                    already_in_user : true,
                })
            } else {
                console.log("first timer cooked ?")
            }
        };
        if (userAccount.user_details.recipesSaved || userAccount.user_details.recipesSaved) {
            check_recipes();
        } 
    }, [])

    React.useEffect ( () => {
        console.log(JSON.stringify(saved_recipe));
        console.log(JSON.stringify(cooked_recipe));
    }, [saved_recipe, cooked_recipe])



    // TO ADD THIS RECIPE TO THE RECIPES SAVED PROPERTY FOR THE USER
    // param1: the category of recipe we want to update in the user object (recipesSaved or recipesCooked)
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
            console.log("yeah!")
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

            // 3c - We update the src of the img (might be good to create a state to achieve that). -  we change the color of the bookmark pic with SVG features (or we just replace the pic with another one)
            // insert SVG manipulation here
        };
    };

    return (
        <div>
            <img src={recipe.pictureUrl} alt={recipe.name} />
            <DivStyle.Bookmark_and_tick>
                <img src="bookmark_not_saved.png" alt="bookmark" onClick={() => bookmark_recipe(saved_recipe, set_saved_recipe)} />
                <img src="bookmark_not_saved.png" alt="star" onClick={() => bookmark_recipe(cooked_recipe, set_cooked_recipe)} />
            </DivStyle.Bookmark_and_tick>

            <DivStyle.Bookmark_and_tick>
                <img src={country.pic} alt="RecipeCountry" />
                <img src={style.pic} alt="RecipeStyle" />
            </DivStyle.Bookmark_and_tick>
        </div>
    );
}
 
export default BlocPicture;