import styled from "styled-components";
import * as MainStyle from "./MainStyle"

//######## HOME PAGE ########// 

    export const Feature_description = styled.div`
        background-color : ${props => props.background_color};
        color : ${props => props.txt_color};
    `;
    export const Double_cta_button = styled.div`
        flex-direction: row;
        margin : 7rem auto;
        justify-content: center;

        > a {
            margin: auto 0.5rem;
        }  
    `;
    export const Welcome_screen = styled.div`
        height : 110vh;
        display : grid;
        overflow : hidden;
        position : relative;
        margin: -5rem 0rem;

        @media(min-width :${MainStyle.device_size.tablet}) {
            margin: -5rem 0rem;
            height: 110vh;
        }  
    `;
    export const Hero_picture = styled.img`
        grid-area: 1 / 1 / 2 / 2;
        z-index : -1;
        position: absolute;
        opacity : 0.5;
        width: 274vw;
        object-position: -43vw -100vh;
        top: -7rem;

        @media(min-width :${MainStyle.device_size.tablet}) {
            object-position: -23vw -95vh;
        }  

        @media(min-width :${MainStyle.device_size.laptopS}) {
            object-position: -25vw -150vh;
        }  
    `;
    export const HomePage_text_and_buttons = styled.div`
        grid-area: 1 / 1 / 2 / 2;
        z-index : 2;
        position: relative;
        top: 5rem;

    `;



//######## USER DASHBOARD ########// 

    export const Dashboard_block_content = styled.div`
        display: flex;
        flex-direction : ${props => props.side};
        cursor : pointer;
        @media(min-width :${MainStyle.device_size.laptopS}) {
            flex-direction : column-reverse;
        } 
    `;
    export const Item_group = styled.div`
        text-align: left;
    `;
    export const Dashboard_text = styled.div`
        margin : auto;
    `;
    export const Dashboard_three_blocks = styled.div`
    @media(min-width :${MainStyle.device_size.laptopS}) {
        flex-direction : row;
        justify-content: space-evenly;
    }  
    `;
    export const Dashboard_category = styled(Feature_description)`
    @media(min-width :${MainStyle.device_size.laptopS}) {
        width : 33.3vw;
    }   
    `;
//######## FOOD STOCK ########// 

    export const Double_food_list = styled(Dashboard_block_content)`
        flex-direction : row;
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
        @media(min-width :${MainStyle.device_size.tablet}) {
            width: 50vw;
        }  
        @media(min-width :${MainStyle.device_size.laptopS}) {
            width: 40vw;
        }  
    `;

    export const Ingredient_category = styled.div`
        margin: 0rem 0rem 3rem;
    `;

//######## RECIPE AVAILABLE ########// 

    export const Recipe_found = styled.div`
    `;
    export const Recipe_block = styled.a`
        margin: 1rem 0rem 2rem;
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
            color: white;
            background-color : ${MainStyle.colors.primary_color};
        }
    `;
    export const All_matching_recipes = styled.div`
        margin: 3rem 0rem;
        @media(min-width :${MainStyle.device_size.tablet}) {
            flex-direction: row;
            justify-content: space-evenly;
        }  
    `;
    export const Recipe_found_block = styled.div`
        background-color : ${props => props.bg_color || "none"};
        @media(min-width :${MainStyle.device_size.tablet}) {
            width: ${props => props.width_big_screen|| "100vw"};
        }  
    
    `
//######## FOODPEDIA / RECIPE EXPLORER ########// 

    export const Double_button = styled.div`
        flex-direction: row;
        margin : 1rem auto;
        justify-content: center;  
        
        @media(min-width :${MainStyle.device_size.laptopS}) {
            width: 35vw;
        }  

    `;

    export const Filter_intro = styled.div`
        align-items: center;
    `;

    export const Filter_group = styled.div`
        margin : auto 2rem 4rem;
        @media(min-width :${MainStyle.device_size.tablet}) {
            margin: auto 12.5rem 4rem;
        }
        @media(min-width :${MainStyle.device_size.laptopS}) {
            margin: auto 30rem 4rem;
        }
    `;



//######## RECIPE DETAILS ########// 

    export const Bookmark_and_tick = styled.div`
        flex-direction: row;
        margin : 1rem auto;
        justify-content: space-evenly; 

        > span {
            margin : auto 0.25rem;
        }
        > svg {
            margin : auto 1rem;
            width: 15vw;
            cursor: pointer;
            @media(min-width :${MainStyle.device_size.tablet}) {
                width: 7vw;
            }  
        }
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
        @media(min-width :${MainStyle.device_size.laptopS}) {
            margin: auto 2rem 5rem; 
        } 
    `;
    export const Suggestion = styled.div`
        margin: 1rem;
        cursor: pointer;
        background-color: ${MainStyle.colors.primary_color};
        color: white;
        border-radius: 1rem;
        width: 100vw;
        padding: 0.5rem;

        &:hover {
            color: ${MainStyle.colors.primary_color};
            background-color: white;
            border: solid 0.2rem ${MainStyle.colors.primary_color}; 
        }
    }

    `;
    export const Login_form_input = styled(Ingredient_list_input)`
        justify-content: center;
        @media(min-width :${MainStyle.device_size.tablet}) {
            font-size: 1.5rem;
        }  
    `;
    export const Ingredients_List_Recipe_Details = styled.div`
        margin: 2rem 0rem;
    `;
    export const BG_steps = styled.div`
        background-color: ${MainStyle.colors.secundary_color};
        border-radius: 0.75rem;
        margin: 1rem 0.5rem 3rem;
    `;

//######## NAVBAR ########// 


    export const NavBar_grid = styled.div`
        display : grid;
        position : sticky;
        top: 0rem;
        z-index : 3;
    `
    export const NavBar_compact = styled.div`
        display: flex;
        grid-area: 1 / 1 / 2 / 2;
        z-index : 2;
        flex-direction: row;
        justify-content: space-between;

        `;

    export const Navbar_extended = styled.div`
        right : ${props => props.visibility.position};
        transition : right 500ms ease-out 0s;
        display: flex;
        grid-area: 1 / 1 / 2 / 2;
        z-index : 1;
        flex-direction : column;
        align-items: flex-start;
        font-size: 1rem;
        text-transform : uppercase;
        color : white; 
        position: absolute;
        width: 100vw;
        background-color : ${MainStyle.colors.primary_color};

        @media(min-width :${MainStyle.device_size.laptopS}) {
           padding : 2rem 0rem;
        }  


        > a {
            margin : 4rem auto;
        }

        > a > span {
            font-family : ${MainStyle.main_fonts.title_font};
            color : white;
            font-weight : bold;
            font-size: 2rem;
            &:hover {
                color: ${MainStyle.colors.secundary_color};
            }
        }
    `

    export const navbar_three_rect = styled.div`
        width : 10%;
        cursor: pointer;
        margin: 0.5rem;
    `;
//######## FOOTER ########// 
    export const Footer_div = styled.div`
        margin: 5rem auto 1rem;
        cursor: pointer;
    `;

    export const Copyright = styled.div`
        font-size : 0.5rem;
        margin : 4rem auto 1rem;
        cursor : none;
    `;

export default Feature_description;



