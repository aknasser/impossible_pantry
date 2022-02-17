import PageTitle from "../../SmallParts/PageTitle"
import PageInstructions from "../../SmallParts/PageInstructions"
import IngredientsSelection from "../../SmallParts/IngredientsSelection"
import axios from "axios"
import  {useContext} from "react";
import UserContext from "../../../Context/UserContext";
import * as React from 'react';



const Pantry = ({allCategories, endpoint}) => {

// USER STOCK MANAGEMENT - here we control the current food stock for a given category. 
// We update it with A POST REQUEST once the user click on let's go! 
// This data comes from the component INgredientsList. 
    const {userAccount, setUserAccount} = useContext(UserContext)

// UPDATE USER FOOD STOCK WITH A POST REQUEST
    const [stock, setStock] = React.useState([]);

// START SUBMIT

    // 1 - completedStock is triggered when the user submit the form (click on the button at the bottom of the page)

    const completedStock = async(event) => {
        event.preventDefault();
        console.log("Let's go!");
     /*  2 - For each category, we collect ownedIngredients and newIngredients.
        * Option1 : We create a new state / setState variable to manage it. See [stock, setStock] above
    */ 
        setUserAccount({
            ...userAccount,
            content : {
                ...userAccount.content,
                name : "Akande"
            }
        });

// 3 - POST request to the endpoint dedicated to user udpdate
        const updatingStock = await axios.post(`${endpoint}/users/update/${userAccount.content._id}`, userAccount.content);

// 4 - After saving the updated data, the server sends a response to the client. This is the signal to move forward and start the redirection towards the results page.
        let confirmation ;

// 5  - Once the post is done and we get the confirmation, we redirect the user to the results using window.href("something").
    console.log("We good ?");

        if (confirmation) {
            window.location.href = "/";   
        }

    };

// END - SUBMIT

// To check the current state of userAccount 
    React.useEffect( () => {
        console.log(`check userAccount name : ${userAccount.content.name}`)
    }, [userAccount]);







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
                    stock = {stock}
                    setStock = {setStock}
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