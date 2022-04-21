import * as DivStyle from "../../Style/DivStyle";
import Cta from "../SmallParts/Cta";
import * as TextStyle from "../../Style/TextStyle"
import StyleContext from "../../Context/StyleContext"
import * as React from 'react';


const PUV = ({pantry_flow}) => {

  const {style, set_style} = React.useContext(StyleContext);

    return (
        <DivStyle.Welcome_screen>
          <DivStyle.HomePage_text_and_buttons>
            <TextStyle.Catchprase>Manage your food stock and find cool recipes</TextStyle.Catchprase>
            <DivStyle.Double_cta_button>
              <Cta 
                cta="Your Food Stock" 
                href = "yourkitchen"
                pantry_flow = {pantry_flow}
                txt_color = "white"
                bg_color =  {style.color_theme.primary_color}
              />
              <Cta 
                cta="Get inspired" 
                href = "search"
                pantry_flow = {pantry_flow}
                txt_color = {style.color_theme.primary_color}
                bg_color =  "white"
              />
            </DivStyle.Double_cta_button>
          </DivStyle.HomePage_text_and_buttons>
          <DivStyle.Hero_picture src="home/hero_pic.jpg" alt="Une belle Hero Picture"/>

        </DivStyle.Welcome_screen>
      );
}
 
export default PUV;