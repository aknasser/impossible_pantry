import styled from "styled-components";
import * as MainStyle from "./MainStyle"

// HOME
export const Cta_Homepage = styled.h2`
    font-size : 0.75rem;
    color : ${props => props.txt_color}; 
    background-color : ${props => props.bg_color};  
    border-radius : 1rem; 
    border: solid 0.2rem ${props => props.txt_color};
    padding: 0.5rem;
`; 


//LOGIN
export const Login_label = styled.label`
    width : 30vw
`; 


// FOOD STOCK
export const Plus_button = styled.input`
    padding: 1rem;
    font-size: 2.5rem;
    font-weight: 800;
    width: 85vw;
    border-radius: 0.5rem;
    background-color : ${MainStyle.colors.third_color};
    color: ${MainStyle.colors.secundary_color};
    border-width: 0.15rem;
    border-style: outset;
    border-color:${MainStyle.colors.secundary_color};
`;

export const Minus_button = styled.button`
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    background-color : ${MainStyle.colors.third_color};
    color: ${MainStyle.colors.secundary_color};
    border-style: outset;
    border-color:${MainStyle.colors.secundary_color};
`

export const Submit_Food_stock = styled(Plus_button)`
    font-family : ${MainStyle.main_fonts.title_font};
    font-size: 1rem;
    border-radius: 0.75rem;
    margin: 5rem auto;
    text-transform: uppercase;
`;

// RECIPE AVAILABLE 

export const Main_button = styled(Plus_button)`
    font-size: 0.75rem;
    font-weight: 800;
    width : 50vw;
    text-transform : uppercase;
    margin: 0rem 1.5rem;
    padding: 0.5rem;

`;

export const Secundary_button = styled.button`
    font-size: 0.75rem;
    font-weight: 800;
    width : 50vw;
    text-transform : uppercase;
    margin: 0rem 1.5rem;
    padding: 0.5rem;
    background-color : ${MainStyle.colors.secundary_color};
    color: ${MainStyle.colors.third_color};
    border-style: outset;
    border-color:${MainStyle.colors.third_color};
    border-radius: 0.5rem;

`;

export default Cta_Homepage;