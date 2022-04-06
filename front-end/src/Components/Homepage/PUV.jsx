
import Cta from "../SmallParts/Cta";
import HeroPicture from "./HeroPicture";



const PUV = ({pantry_flow}) => {

    return (
        <>
         <h1>Find your Next Cooking experience in a flash</h1>
          <HeroPicture/>
          <Cta 
            cta="Your Food Stock" 
            href = "yourkitchen"
            pantry_flow = {pantry_flow}
          />
          <Cta 
            cta="Looking for inspiration" 
            href = "search"
            pantry_flow = {pantry_flow}
          />
        </>
      );
}
 
export default PUV;