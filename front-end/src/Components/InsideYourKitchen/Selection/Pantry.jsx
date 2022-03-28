import PageTitle from "../../SmallParts/PageTitle"
import PageInstructions from "../../SmallParts/PageInstructions"
import IngredientsSelection from "../../SmallParts/IngredientsSelection"
import axios from "axios"
import  {useContext} from "react";
import UserContext from "../../../Context/UserContext";
import * as React from 'react';



const Pantry = ({allCategories, endpoint, pantryUpdater, checkValidation}) => {

// USER STOCK MANAGEMENT - here we control the current food stock for a given category. 
// We update it with A POST REQUEST once the user click on let's go! 
// This data comes from the component INgredientsList. 
    const {userAccount, setUserAccount} = useContext(UserContext)

// we assign an initial value to stock. stock (initialValue) = userAccount.content.stock
    const [stock, setStock] = React.useState([...userAccount.content.stock]);


// START SUBMIT

    // 1 - completedStock is triggered when the user submit the form (click on the button at the bottom of the page)

    const completedStock = async(event) => {
        event.preventDefault();
        console.log("Let's go!");
     /*  2 - For each category, we collect ownedIngredients and newIngredients.
        ==> We've created a new state / setState variable to manage it. See [stock, setStock] above
        ==> At this stage, stock is likely to have duplicates. We will clean it and then include it in the userAccount.
    */ 

    // 3 - Cleaning STOCK state. Let's get rid of the duplicate
        /* The hash table is super useful to get rid of duplicates :
        If we try to store a key-value pair where the key already exists, it simply overwrites the old value while keeping the same key
        In others words, our key can only once and the value will be equal to the most recent version of the value.
        (Read it many times and you will understand how powerful this property is:D  ) 
        */ 
        
        
        const stockHashTable = {}; 

        /*We add the content of stock to the hashTable.
            key = the name of the ingredient |value = the ingredient and all its properties (name, quantity, unit),
            the key is unique meaning that our hash table contains only ONE instance of each ingredient added to the stock
            Bye bye troublesome duplicates. 
        */  
        for (let food of stock) {
            stockHashTable[food.ingredient.name] = food;
        }
        console.log(`HASH TABLE : ${JSON.stringify(stockHashTable)}`)

// 4 - POST request to the endpoint dedicated to user udpdate
        const updatingStock = await axios.post(`${endpoint}/users/stockupdate/${userAccount.content._id}`, stockHashTable);

// 6 - After saving the updated data, the server sends a response to the client. This is the signal to move forward and start the redirection towards the results page.
    console.log(updatingStock.data);    
    let confirmation = updatingStock.data;

// 7  - Once the post is done and we get the confirmation, we redirect the user to the results using window.href("something").
    console.log("We good ?");

        if (confirmation) {
            pantryUpdater({
                type : "FORM_SUBMITTED"
            });
/*             window.location.href = "/recipesavailable";   
 */     }
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
                    checkValidation = {checkValidation}
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