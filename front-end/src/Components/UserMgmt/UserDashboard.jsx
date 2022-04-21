import * as React from 'react';
import UserContext from "../../Context/UserContext";
import axios from "axios";
import StyleContext from '../../Context/StyleContext';
import * as DivStyle from '../../Style/DivStyle';
import * as TextStyle from '../../Style/TextStyle'
import * as PictureStyle from '../../Style/PictureStyle'


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
            <DivStyle.Dashboard_three_blocks>

                <DivStyle.Dashboard_category 
                    background_color={style.color_theme.third_color} 
                    txt_color="white" 
                    onClick = {app_flow}
                >
                    <TextStyle.Dashboard_title>Current Food Stock</TextStyle.Dashboard_title>
                    <DivStyle.Dashboard_block_content side="row">
                        <DivStyle.Dashboard_text>
                            <h4> Recently added</h4>
                            <DivStyle.Item_group>
                                {food_recently_added.map(food => (
                                    <TextStyle.Item_dashboard key= {food.ingredient.name}>{food.ingredient.name}</TextStyle.Item_dashboard> 
                                ))}
                                <TextStyle.Item_dashboard>...</TextStyle.Item_dashboard>
                            </DivStyle.Item_group>
                        </DivStyle.Dashboard_text>
                        <PictureStyle.Dashboard_picture src="dashboard/fridge.svg" alt="huge fridge" />
                    </DivStyle.Dashboard_block_content>
                </DivStyle.Dashboard_category>
                     

                <DivStyle.Dashboard_category
                    background_color={style.color_theme.secundary_color} 
                    txt_color={style.color_theme.third_color} 
                >
                    <TextStyle.Dashboard_title>Recipes Bookmarked</TextStyle.Dashboard_title>
                    <DivStyle.Dashboard_block_content side="row-reverse">
                        <DivStyle.Dashboard_text>
                        {recipes_saved.length <= 0 ? (
                                <span>No recipes saved yet</span>
                            ) : (
                            <DivStyle.Item_group>
                                {recipes_saved.map(recipe => (
                                    <TextStyle.Recipe_in_dashboard key = {recipe._id} onClick={() => go_to_recipe_details(recipe)}>{recipe.name}</TextStyle.Recipe_in_dashboard>
                                ))}
                            </DivStyle.Item_group>
                        )}
                        </DivStyle.Dashboard_text>
                        <PictureStyle.Dashboard_picture src="dashboard/bookmark.svg" alt="bookmark" />  
                    </DivStyle.Dashboard_block_content>
                </DivStyle.Dashboard_category>


                <DivStyle.Dashboard_category
                    background_color={style.color_theme.third_color} 
                    txt_color="white" 
                >
                    <TextStyle.Dashboard_title>Recipes Cooked</TextStyle.Dashboard_title>
                    <DivStyle.Dashboard_block_content side="row">
                        <DivStyle.Dashboard_text>
                            {recipes_cooked.length <= 0 ? (
                                <span>No recipes cooked yet</span>
                                ) : (
                                <DivStyle.Item_group>
                                    {recipes_cooked.map(recipe => (
                                        <TextStyle.Recipe_in_dashboard key = {recipe._id} onClick={() => go_to_recipe_details(recipe)}>{recipe.name}</TextStyle.Recipe_in_dashboard>
                                    ))}
                                </DivStyle.Item_group>
                            )}
                        </DivStyle.Dashboard_text>
                        <PictureStyle.Dashboard_picture src="dashboard/fork.svg" alt="the king of fork" />
                    </DivStyle.Dashboard_block_content>
                </DivStyle.Dashboard_category>
            </DivStyle.Dashboard_three_blocks>
    );
}
 
export default UserDashboard;