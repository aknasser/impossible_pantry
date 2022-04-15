
import * as DivStyle from "../../Style/DivStyle";
import Cta from "../SmallParts/Cta";
import HeroPicture from "./HeroPicture";
import * as TextStyle from "../../Style/TextStyle"
import StyleContext from "../../Context/StyleContext"
import * as React from 'react';


const PUV = ({pantry_flow}) => {

  const {style, set_style} = React.useContext(StyleContext);

    return (
        <>
         <TextStyle.Catchprase>Manage your food stock and find cool recipes</TextStyle.Catchprase>
          <HeroPicture/>
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

        </>
      );
}
 
export default PUV;