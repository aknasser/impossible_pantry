import styled from "styled-components";
import * as MainStyle from "./MainStyle"

// HOME
export const Cta_Homepage = styled.button`
    font-size: 1rem;
    color : ${props => props.txt_color}; 
    background-color : ${props => props.bg_color};  
    border-radius : 1rem; 
    border: solid 0.2rem ${props => props.txt_color};
    padding: 0.5rem;
    font-weight: 700;
    cursor : pointer;
    transition : all 200ms ease-out 0s;

    @media(min-width :${MainStyle.device_size.tablet}) {
        font-size: 1.75rem;
    }  

    
    &:hover {
        color : ${props =>props.bg_color};
        background-color : ${props => props.txt_color};  
    }
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
    transition : all 250ms ease-out 0s;
    @media(min-width :${MainStyle.device_size.tablet}) {
        width: 50vw;
    }
    @media(min-width :${MainStyle.device_size.laptopS}) {
        width: 40vw;
    }    

    &:hover {
        color : ${MainStyle.colors.third_color};
        background-color : ${MainStyle.colors.secundary_color};  
    }
`;

export const Minus_button = styled.button`
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    background-color : ${MainStyle.colors.third_color};
    color: ${MainStyle.colors.secundary_color};
    border-style: outset;
    border-color:${MainStyle.colors.secundary_color};


    &:hover {
        color : ${MainStyle.colors.third_color};
        background-color : ${MainStyle.colors.secundary_color};  
    }
`

export const Submit_Food_stock = styled(Plus_button)`
    font-family : ${MainStyle.main_fonts.title_font};
    font-size: 1.5rem;
    border-radius: 0.75rem;
    margin: 5rem auto;
    text-transform: uppercase;
`;

// RECIPE AVAILABLE 

export const Main_button = styled(Plus_button)`
    font-size: 0.75rem;
    font-family : ${MainStyle.main_fonts.title_font};
    font-weight: 800;
    width : 50vw;
    text-transform : uppercase;
    margin: 0rem 1.5rem;
    padding: 0.5rem;
    @media(min-width :${MainStyle.device_size.tablet}) {
        width: 25vw;
        font-size : 1rem;
    }
      
`;

export const Secundary_button = styled.span`
    font-size: 0.75rem;
    font-family : ${MainStyle.main_fonts.title_font};
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
    transition : all 250ms ease-out 0s;

    
    @media(min-width :${MainStyle.device_size.tablet}) {
        width: 25vw;
        font-size : 1rem;
    }
      
    
    &:hover {
        color : ${MainStyle.colors.secundary_color};
        background-color : ${MainStyle.colors.third_color};  
    }

`;

// NAVBAR

export const Navbar_CTA = styled(Cta_Homepage)`

    background-color : ${props => props.bg_button};
    color : ${props => props.txt_button};
    margin: 0.2rem 0.5rem;
    transition : all 500ms ease-out 0s;

    &:hover {
        color : ${MainStyle.colors.primary_color};
        background-color : white;  
    }
    
`;
// LOADING MESSAGE AND 404


export const Error_button = styled(Secundary_button)`
    margin: 1rem auto;
`; 


export default Cta_Homepage;