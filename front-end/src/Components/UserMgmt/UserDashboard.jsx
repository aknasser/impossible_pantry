import * as React from 'react';
import UserContext from "../../Context/UserContext";
import axios from "axios";
import StyleContext from '../../Context/StyleContext';
import * as DivStyle from '../../Style/DivStyle';
import * as TextStyle from '../../Style/TextStyle'


const UserDashboard = ({pantryUpdater, endpoint}) => {
    const {userAccount, setUserAccount} = React.useContext(UserContext);
    const {style, set_style} = React.useContext(StyleContext);

    
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
        console.log(JSON.stringify(`ULTIMATE FIVe :${JSON.stringify(last_five_ingredients)}`));
    }, [user_stock]);

    // TO GET THE FULL RECIPE INFORMATIONS (to optimized later)
    const [recipes_saved, set_recipes_saved] = React.useState([]);
    const [recipes_cooked, set_recipes_cooked] = React.useState([]);
    React.useEffect( () => {
        const full_recipes_info = async() => {
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
        }
        full_recipes_info();
    }, []);



    return (
        <>
            <h2>{userAccount.user_details.name}</h2>
            <div>

                <DivStyle.Feature_description 
                    background_color={style.color_theme.third_color} 
                    txt_color="white" 
                    onClick = {app_flow}
                >
                    <TextStyle.Dashboard_title>Current Food Stock</TextStyle.Dashboard_title>
                    <DivStyle.Dashboard_block>
                        <div>
                            <h4>Recently added</h4>
                            <div>
                                {food_recently_added.map(food => (
                                    <div key = {food._id}>
                                        <TextStyle.Item_dashboard>{food.ingredient.name}</TextStyle.Item_dashboard> 
                                        <br />
                                    </div>
                                ))
                                }
                                <TextStyle.Item_dashboard>...</TextStyle.Item_dashboard>
                            </div>
                        </div>
                        <img src="" alt="coming soon" />
                    </DivStyle.Dashboard_block>
                </DivStyle.Feature_description>
                     

                <DivStyle.Feature_description
                    background_color={style.color_theme.secundary_color} 
                    txt_color={style.color_theme.third_color} 
                >
                    <TextStyle.Dashboard_title>Recipes Bookmarked</TextStyle.Dashboard_title>
                    <DivStyle.Dashboard_block>
{/*                         <div>
                            {recipes_saved.map(recipe => (
                                <div key = {recipe._id} onClick={() => go_to_recipe_details(recipe)}>
                                    <TextStyle.Item_dashboard>{recipe.name}</TextStyle.Item_dashboard>
                                    <br />
                                </div>
                            ))}
                        </div> */}
                        <img src="" alt="coming soon" />  
                    </DivStyle.Dashboard_block>
                </DivStyle.Feature_description>


                <DivStyle.Feature_description
                    background_color={style.color_theme.third_color} 
                    txt_color="white" 
                >
                    <TextStyle.Dashboard_title>Recipes Cooked</TextStyle.Dashboard_title>
                    <DivStyle.Dashboard_block>
{/*                         {recipes_cooked.map(recipe => (
                            <div key = {recipe._id} onClick={() => go_to_recipe_details(recipe)}>
                                <TextStyle.Item_dashboard key = {recipe._id}>{recipe.name}</TextStyle.Item_dashboard>
                                <br />
                            </div>
                        ))} */}
                        <img src="" alt="coming soon" />
                    </DivStyle.Dashboard_block>
                </DivStyle.Feature_description>
            </div>
        </>
    );
}
 
export default UserDashboard;