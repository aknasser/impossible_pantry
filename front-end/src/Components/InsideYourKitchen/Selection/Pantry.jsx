import PageTitle from "../../SmallParts/PageTitle"
import PageInstructions from "../../SmallParts/PageInstructions"
import IngredientsSelection from "../../SmallParts/IngredientsSelection"
import axios from "axios"



const Pantry = ({allCategories, endpoint}) => {

// UPDATE USER FOOD STOCK WITH A POST REQUEST
    
    // 1 - completedStock is triggered when the user submit the form (click on the button at the bottom of the page)

    /*  2 - Fo each category, we collect ownedIngredients and newIngredients. 2 options : 
        * Option1 : We create a new state / setState variable to manage it
        * Option2 : We move ownedIngredients and newIngredients here and update them in the child component (by passing their respective state updater function as a prop) 
    */ 

    // 3 - POST request to the endpoint dedicated to user udpdate

    // 4  - Once the post is done, we redirect the user to the results using window.href("something").
    const completedStock = (event) => {
        event.preventDefault();


    };


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
            <form onSubmit={completedStock}>
                <input type="submit" />
            </form>
        </>
    );
}   
 export default Pantry
;