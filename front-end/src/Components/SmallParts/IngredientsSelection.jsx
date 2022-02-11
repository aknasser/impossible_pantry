import axios from 'axios';
import * as React from 'react';
import IngredientsList from "./IngredientsList";
import UserContext from "../../Context/UserContext"
import { useContext } from "react";



const IngredientsSelection = ({category, endpoint}) => {


// User Stock Management here we control the current food stock for a given category.
// This data comes from the component INgredientsList 
    const {userAccount, setUserAccount} = useContext(UserContext)

    const userStock = userAccount.content.stock


// This variable includes all the ingredients available for a given category.
    const [categoryIng, setCategoryIng] = React.useState([]);



    React.useEffect(() => {
        //isMounted will help us to control the state of the component and set the clean-up function (the return function at the end of fechCatIng)
        let isMounted = true;

        const fetchCatIng = async() => {
            try {
                // we loop in the ingredients included in category.
                for (let i = 0; i < category.ingredients.length; i++) {
                    const ingFetched = await axios.get(`${endpoint}/ingredients/${category.ingredients[i]}`, {crossdomain : true});
                    
                    // IF the ingredient exists AND the component is mounted 
                    if (category.ingredients[i] && isMounted) {

                        // We update the state by adding a new ingredient to the array categoryIng
                        setCategoryIng(categoryIng => [...categoryIng, ingFetched.data])
                    }
                }
            } catch(e) {
                console.log("Heyo we have some issue to fetch the data : " + e);
            }
        }; 
        fetchCatIng();

    //below, The clean-up function. We used is to set isMounted = false; "block" the fetch while waiting for the mounting component. 
        return () => {
            isMounted = false;
            console.log("Component not mounted yet")
            // When the component is unmounted, we empty the state categoryIng to avoid duplicates (can happens sometime in the lifecycle)
             setCategoryIng([]);
        };
    }, []);


    


// This variable includes the ingredients added by the user to its foodstock.
    const [newIngredients, setNewIngredients] = React.useState([]);
    const [ingredientTyped, setIngredientTyped] = React.useState(""); // Might be good to convert it into an object with the following property : name, quantity, unit, will be easier to manage.

// This function enable us to update the IngredientList
    const validationIngredients = (event) => {
        event.preventDefault();

        // A - CHECK IF INGREDIENT IS VALID

        // 1 - We compare ingredientTyped with categoryIng - IF ingredientTyped is  present in category ...
        let validIngredient = false;

        for (let i = 0; i < categoryIng.length; i++) {
            if (ingredientTyped === categoryIng[i].name) {
                // 2 - We execute the code below
/*                 setNewIngredients(newIngredients => [...newIngredients, ingredientTyped])
 */                validIngredient = true;
            } 
        }
        console.log("validIngredient : " + validIngredient)


        // B- CHECK IF INGREDIENT IS A DUPLICATE (NEW INGREDIENT)

        // isUniqueNewIng and isUniqueUserIng are "controller". We use them to check duplicates. They will remain true IF ingredientTyped is UNIQUE in NewIngredients and userIngredients
        let isUniqueNewIng = true;

        const duplicateChecker = (controller, arrayToCheck) => {
            // We loop in the array to check...
            for (let i = 0; i < arrayToCheck.length; i++) {
                // If the ingredientTyped is already in the array to check...
                if (ingredientTyped === arrayToCheck[i]) {
                    console.log(`Duplicate!`); 
                    controller = false;
                    break; // No need to keep looping if we find a duplicate. 
                    // Otherwise, if the array IS NOT in the array to check...
                } else {
                    console.log(`Unique!!`);
                    controller = true;
                } 
            }
            return controller;
        }

        isUniqueNewIng = duplicateChecker(isUniqueNewIng, newIngredients);


        // 3a - If we don't find any equality,validIngredient remains false = We sent an alert to the user. 
        if (!validIngredient) {
            alert(`${ingredientTyped} is not a valid ingredient for this category. Please correct your entry or pick another category.`);
        }

        // 3b - If we find an object with the same name , isUniqueNewIng IS false = We sent an alert to the user.         
        if (!isUniqueNewIng) {
            alert(`${ingredientTyped} is already in the food stock. Please add another ingredient.`)
        }
        // 3d - When these 3 conditions are fulfilled, we execute this code to add the ingredientTyped to the list of newIngredients.
        if (validIngredient && isUniqueNewIng) {
            setNewIngredients(newIngredients => [...newIngredients, ingredientTyped])
        } 
    };


    
// We use this function to constantly update what the user is typing.
    const ingredientUpdater = (event) => {
        setIngredientTyped(event.target.value);
        console.log(`The user is typing : ${event.target.value}`)
    };
    return (
        <div>
            <h3>{category.name}</h3>
            <img src={category.categoryPicture} alt="Category" />
            <h4>{category.description}</h4>
            <form action="" onSubmit={validationIngredients}>
                <label htmlFor="pickedIng">In your kitchen...</label>
                <input list={category.name} id={category._id} name="pickedIng" onChange={ingredientUpdater} />
                <datalist id={category.name}>
                    {categoryIng.map(ingredient => (
                        <option value={ingredient.name}  key={ingredient._id}  />
                    ))} 
                </datalist>
                <label htmlFor="quantity">Quantity</label>
                <input type="text" id="quantity" />
                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" value="unit" readOnly />
                <input type="submit" />
            </form>
            <IngredientsList 
                ingredients = {newIngredients} // All the new ingredients (the ingredients we are adding while filling the form)
                ingredientUpdater = {setNewIngredients} // set updater Function. We use this function in IngredientList to delete ingredients if needed.
                catIng = {category.ingredients} // all the ingredients for a given category
            />

        </div>
    );
}
 
export default IngredientsSelection;