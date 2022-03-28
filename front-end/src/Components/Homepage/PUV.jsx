import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import Cta from "../SmallParts/Cta";
import HeroPicture from "./HeroPicture";



const PUV = () => {
  const {userAccount, setUserAccount} = useContext(UserContext)

    return (
        <>
         <span>{userAccount.content.name}</span>
         <h1>Find your Next Cooking experience in a flash</h1>
          <HeroPicture/>
          <Cta 
            cta="Your Food Stock" 
            href = "yourkitchen"
          />
          <Cta 
            cta="Looking for inspiration" 
            href = "search"
          />
        </>
      );
}
 
export default PUV;