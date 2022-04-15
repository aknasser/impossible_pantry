import styled from "styled-components";
import * as MainStyle from "./MainStyle"

//######## HOME PAGE ########// 

    export const Feature_description = styled.div`
        background-color : ${props => props.background_color};
        color : ${props => props.txt_color};
    `;
    export const Double_cta_button = styled.div`
        flex-direction: row;
        margin : 2.5rem auto;
        justify-content: center;  
    `;

//######## USER DASHBOARD ########// 

    export const Dashboard_block = styled.div`
        display: flex;
        flex-direction : row;
    `;

//######## FOOD STOCK ########// 

    export const Double_food_list = styled(Dashboard_block)`
    `;
    export const Food_list = styled.div`
        margin : 1rem auto;
    `
    export const Ingredient = styled.div`
        display: flex;
        flex-direction : row;
    `;

    export const Ingredient_list_input = styled.div`
        flex-direction: row;    
        width: 85vw;
        margin: 1rem auto;
    `;

//######## RECIPE AVAILABLE ########// 

    export const Recipe_found = styled.div`

    `;
//######## FOODPEDIA / RECIPE EXPLORER ########// 

    export const Double_button = styled.div`
        flex-direction: row;
        margin : 1rem auto;
        justify-content: center;    
    `;

    export const Filter_intro = styled.div`
        align-items: center;
    `;

    export const Filter_group = styled.div`
        margin : auto 2rem;
    `;


//######## RECIPE DETAILS ########// 

    export const Bookmark_and_tick = styled.div`
        flex-direction: row;
        margin : 1rem auto;
        justify-content: space-evenlys; 
    `;

    export const Difficulty_s_stars = styled.div`
        flex-direction: row;
        margin : 1rem auto;
        justify-content: center; 
    `;
    export const Cooking_instructions = styled.div`
        text-align : left;
        margin: 0.5rem;
    `;

    export const Featured_recipes = styled.div`
        display : flex;
        flex-direction: row;
        justify-content: center; 
    `;
    export const Suggestion = styled.div`
        margin:  auto 1rem;
    `;
    export const Login_form_input = styled(Ingredient_list_input)`
        justify-content: center;
    `;
    export const Ingredients_List_Recipe_Details = styled.div`
        margin: 2rem auto; 
    `;
    export const BG_steps = styled.div`
        background-color: ${MainStyle.colors.secundary_color};
        border-radius: 0.75rem;
        margin: 0.5rem;
    `;

//######## NAVBAR ########// 

    export const NavBar_compact = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

export default Feature_description;



