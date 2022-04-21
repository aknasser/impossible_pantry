import { createGlobalStyle } from "styled-components";


export const device_size = {
    mobileS :"320px",
    mobileM :"375px",
    mobileL :"425px",
    tablet :"768px",
    laptopS :"1024px",
    laptopM :"1440px"
};

export const colors = {
      primary_color : "rgb(25, 42, 81)", // Navy Blue
      secundary_color : "rgb(234, 224, 204)", // Cream
      third_color : "rgb(123, 62, 25)", // Dark brown
      drawing_color : "rgb(205, 236, 247)"  // light Blue
};

export const main_fonts = {
    title_font : "Fira Sans Condensed, sans-serif;",
    subtitle_font : "Sriracha, cursive",
    body_font : "Oxygen, sans-serif"
};

// The default style for div, button, input, picture, text, titles, etc. 
 const Global_style = createGlobalStyle`
    body {
        font-family : ${main_fonts.body_font};
        text-align : center;
        color : ${colors.primary_color};
        margin: 0rem;
    }
    div {
        display: flex;
        flex-direction: column;
    }
    h1, h2, h3, button{
        font-family : ${main_fonts.title_font};
        text-transform : uppercase;
    }
    h4, h5, h6{
        font-family : ${main_fonts.subtitle_font};
        font-weight : normal;
    }
    span, p{
        font-family : ${main_fonts.body_font};
    }
    a {
        text-decoration : none;
    }

`
export default Global_style;