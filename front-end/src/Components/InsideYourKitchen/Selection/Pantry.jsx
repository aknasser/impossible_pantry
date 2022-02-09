import PageTitle from "../../SmallParts/PageTitle"
import PageInstructions from "../../SmallParts/PageInstructions"
import Cta from "../../SmallParts/Cta";
import IngredientsSelection from "../../SmallParts/IngredientsSelection"

const Pantry = ({allCategories, endpoint}) => {


    return ( 
        <>
            <PageTitle title= "Your Food Stock"></PageTitle>
            <PageInstructions instructions= "What do you have at home ?" />

            {/* Use a array.map here categories */}
             {allCategories.content.map(category => (
                <IngredientsSelection
                    key = {category._id} 
                    category = {category}
                    endpoint = {endpoint} 
                />
            ))} 
            <Cta cta="Let's go!"></Cta>
        </>
    );
}   
 export default Pantry
;