import { Link } from "react-router-dom";
import * as ButtonStyle from "../../Style/ButtonStyle"


const Cta = ({cta, href, pantry_flow, txt_color, bg_color}) => {
    
    // SOME ACTION TO UPDATE THE PANTRY AND CHANGE THE UI.
    
    
    return (
        <>
            <Link to={`/${href}`}>
                <ButtonStyle.Cta_Homepage txt_color = {txt_color} bg_color ={bg_color} >{cta}</ButtonStyle.Cta_Homepage>
            </Link>
        </>
    );
}
 
export default Cta;