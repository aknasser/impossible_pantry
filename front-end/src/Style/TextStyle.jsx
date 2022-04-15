import styled from "styled-components";
import * as MainStyle from "./MainStyle"

export const Page_title = styled.h1`
    font-weight : 900;
`;


//######## HOMEPAGE #####//
export const Catchprase = styled.h1`
    font-size : 1.5rem;
    font-weight : 900;
`; 

export const Login_label = styled.label`
    width : 30vw
`; 

//######## DASHBOARD #####//
export const Dashboard_title = styled.h3`
    font-size: 1.5rem;
    font-weight: 800;
`;
export const Item_dashboard = styled.span`
    font-weight: 200;
`;

export const Page_description = styled.h4`
    font-weight: lighter;
    margin : 0rem auto 3rem;
`;

//######## FOOD STOCK #####//


export const Ingredient_list_element = styled.span`
    margin: 0rem 0.25rem;
`;


// RECIPE AVAILABLE
export const Recipe_group_title = styled.h3`
    color: white;
    background-color : ${MainStyle.colors.primary_color};
    padding : 1rem;
    font-weight: 800;
    text-transform : uppercase;
`

export const Recipes_group_description = styled(Page_description)`
    font-size : 0.75rem;
    font-family : ${MainStyle.main_fonts.body_font};
    margin : 0rem auto 1.5rem;
`;

export const Recipe_available_title = styled.h4`
    font-size : 1.5rem;
`;

export const Recipe_available_spec = styled.span`
    font-weight : 200
`


//RECIPE EXPLORER

export const Filter_name = styled.h3`
    font-weight: 900;
    font-size: 1.25rem;
}
`;

export default Catchprase;