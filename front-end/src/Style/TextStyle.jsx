import styled from "styled-components";
import * as MainStyle from "./MainStyle"

export const Page_title = styled.h1`
    font-weight : 900;
    font-size: 4rem;
`;


//######## HOMEPAGE #####//
export const Catchprase = styled.h1`
    font-size : 2rem;
    font-weight : 900;
`; 
export const Login_label = styled.label`
    width : 30vw
`; 
export const Activity_details_title = styled.h3`
    font-size : 2.5rem;
`;
export const Activity_details_desc = styled.h4`
    font-size :1rem;
    @media(min-width :${MainStyle.device_size.tablet}) {
        font-size :1.5rem;
    }  
`;
//######## DASHBOARD #####//
export const Dashboard_title = styled.h3`
    font-size: 1.75rem;
    font-weight: 800;
    @media(min-width :${MainStyle.device_size.tablet}) {
        font-size :2.5rem;

    }  
    
`;
export const Item_dashboard = styled.span`
    font-weight: 200;
    margin: 0.1rem 0.5rem;
`;

export const Page_description = styled.h4`
    font-weight: lighter;
    margin : 0rem auto 3rem;
`;

export const Recipe_in_dashboard = styled(Item_dashboard)`
    color: white;
    background-color: ${MainStyle.colors.third_color};
    padding: 0.5rem;
    border-radius: 1rem;
    font-weight: 200;
    transition : all 250ms ease-out 0s;

    &:hover {
        color : ${MainStyle.colors.third_color};
        background-color: white;
        font-weight : 600;
    }

    @media(min-width :${MainStyle.device_size.tablet}) {
        padding :1rem;
    }  
`;

//######## FOOD STOCK #####//


export const Category_title  = styled(Dashboard_title)`
`;
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

// FOOTER

export const Recipe_title_footer = styled.h5`
    margin: 1rem auto 0.5rem;
`;
export const Recipe_description_footer = styled(Item_dashboard)`
    font-size: 0.75rem;
`;

export default Catchprase;