import * as React from 'react';
import UserContext from "../Context/UserContext";
import axios from "axios";


const UserDashboard = ({pantryUpdater, endpoint}) => {
    const {userAccount, setUserAccount} = React.useContext(UserContext)
    
    const app_flow = () => {
        pantryUpdater({
            type : "UI_FLOW",
            page_name : "pantry"
        })
    };

    const go_to_recipe_details = (recipe) => {
        pantryUpdater({
            type : "RECIPE_PICKED",
            recipe : recipe
        })
    }


    // TO GET THE LAST FIVE INGREDIENTS ADDED BY THE USER
    const user_stock = userAccount.user_details.stock;
    const [food_recently_added, set_food_recently_added] = React.useState([]);


    React.useEffect ( () => {
        const last_five_ingredients = user_stock.filter(ing => {
            return user_stock.indexOf(ing) >= user_stock.length - 5 
        })
        set_food_recently_added(last_five_ingredients);
        console.log(JSON.stringify(last_five_ingredients));
    }, [user_stock]);

    // TO GET THE FULL RECIPE INFORMATIONS (to optimized later)
    const [recipes_saved, set_recipes_saved] = React.useState([]);
    const [recipes_cooked, set_recipes_cooked] = React.useState([]);
    React.useEffect( async() => {
        const recipes_saved_details = [];
        const recipes_cooked_details = [];


        for (let recipe_id of userAccount.user_details.recipesSaved) {
            const details_recipe_saved = await axios.get(`${endpoint}/recipes/id/${recipe_id}`);
            recipes_saved_details.push(details_recipe_saved.data);
        }
        set_recipes_saved(recipes_saved_details); 

        for (let recipe_id of userAccount.user_details.recipesCooked) {
            const details_recipe_cooked = await axios.get(`${endpoint}/recipes/id/${recipe_id}`);
            recipes_cooked_details.push(details_recipe_cooked.data);
        }
        set_recipes_cooked(recipes_cooked_details); 

    }, []);

    return (
            <>
                <h2>{userAccount.user_details.name}</h2>
                <div>
                    <div onClick = {app_flow}>
                        <h3>Current Food Stock</h3>
                        <h4>Recently added</h4>
                        <div>
                            {food_recently_added.map(food => (
                                <div key = {food._id}>
                                    <span>{food.ingredient.name}</span>
                                    <br />
                                </div>
                            ))}
                            <span>...</span>
                        </div>
                    </div>
                    
                    <h3>Recipes Bookmarked</h3>
                    <div>
                        {recipes_saved.map(recipe => (
                            <div key = {recipe._id} onClick={() => go_to_recipe_details(recipe)}>
                                <span>{recipe.name}</span>
                                <br />
                            </div>
                        ))}
                    </div>
                    <h3>Recipes Cooked</h3>
                    <div>
                        {recipes_cooked.map(recipe => (
                            <div key = {recipe._id} onClick={() => go_to_recipe_details(recipe)}>
                                <span key = {recipe._id}>{recipe.name}</span>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </>
    );
}
 
export default UserDashboard;