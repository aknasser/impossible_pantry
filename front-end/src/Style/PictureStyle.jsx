import styled from "styled-components";
import * as MainStyle from "./MainStyle"



// ###### HOMEPAGE ###### //


export const Feature_picture = styled.img`
    width: ${props => props.width};
    max-height: 46vh;
    margin: 2rem auto;
`;


// ###### USER DASHBOARD ###### //
export const Dashboard_picture = styled.img`
    max-width: 30vw;
    max-height: 46vh;
    margin: 1rem auto;
`;


// ###### RECIPE DETAILS ###### //
export const Dish_pic = styled.img`
    margin : 1rem auto;
    width: 55vw;
    border-radius: 0.5rem;
    @media(min-width :${MainStyle.device_size.tablet}) {
        width: 40vw;
    } 
    @media(min-width :${MainStyle.device_size.laptopS}) {
        width: 30vw;
    } 
`; 

export const Difficulty_star = styled.img`
    width: 10vw;
`;


// ###### RECIPES EXPLORER ###### //

export const Filter_pic = styled.img`
    max-height: 40vh;
    max-width: 80vw;
    margin: 1.5rem auto;
    @media(min-width :${MainStyle.device_size.tablet}) {
        max-height: 37vh;
        max-width: 22vw;
    } 
`; 


// ###### NAVBAR ###### //


export const navBar_rect = styled.svg`
    margin : 0.15rem; 
    transition : all 500ms ease-out 200ms;
    `;


export default Dish_pic;