import styled from "styled-components";
import * as MainStyle from "./MainStyle"

export const Login_input = styled.input`
    width : 60vw;
    border: solid 0.1rem ${MainStyle.colors.primary_color};
    border-radius: 0.25rem;
    text-align: left;

    @media(min-width :${MainStyle.device_size.laptopS}) {
        font-size: 1.5rem;
    } 

    &:focus {
        border: solid 0.2rem ${MainStyle.colors.primary_color};
        background-color : ${MainStyle.colors.drawing_color};
    }
`; 

export const Food_stock_input = styled(Login_input)`
    @media(min-width :${MainStyle.device_size.tablet}) {
        width: 43vw;
        font-size: 1.5rem;
    } 
    @media(min-width :${MainStyle.device_size.laptopS}) {
        width: 33vw;
    } 
`;

export const Filter_input = styled(Login_input)`
`;
export const Login_label = styled.label`
    width : 30vw;
    text-align: left;
    @media(min-width :${MainStyle.device_size.laptopS}) {
        font-size: 1.5rem;
    } 

`;


export const Keywords_form = styled.form`
    display : flex;
    flex-direction : row;
    justify-content: space-evenly;
    margin: 0rem 0.5rem;
`

export default Login_input;