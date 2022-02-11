import UserContext from "../../Context/UserContext"
import React, { useContext, useEffect } from "react";


const IngredientsList = ({ingredients, ingredientUpdater, catIng}) => {
    // To set and update the user details (stored in the UserContext).
    const {userAccount, setUserAccount} = useContext(UserContext)
 

    // BUILD THE MATCHING FOOD ARRAY : This array display the ingredients already owned by the user.

    // 1 - Take all the ingredients from the given category
    // We get them using catIng (props from IngredientsSelection)

    const userStock = userAccount.content.stock;
    const [matchingFood, setMatchingFood] = React.useState([]);

    // 2 - Check the user stock with FOR - FOR - IF (The performance can be improved here - gonna check that later)
    const superLoops = () => {
        for (let i = 0 ; i < catIng.length ; i++) {
            for (let j = 0 ; j < userStock.length ; j++) {
                // When there is a match, we add the name of the food owned by the user to matching Food
                if (catIng[i] === userStock[j].ingredient._id) {
                     setMatchingFood(matchingFood => [...matchingFood, userStock[j].ingredient.name])
                }
            }
        }
    }


    React.useEffect(() => {
        superLoops();
        return () => {
            // to clean the function when the component is unmounted. Vital to avoid duplicate in the array matchingFood.
            setMatchingFood([]);
        }
    }, []);

    // 3  - Display the results in an log (optional). 
 
    // DELETE NEW INGREDIENTS AND USER INGREDIENT WITH ONE CLICK
    // Argument 1 : The array in which the food to delete is located | Argument 2 : the food to delete | Argument 3 : We use this function to update the state and get an array WITHOUT the food to delete
    const deleteIngredient = (foodArray, foodToDelete, updatingFunction) => {
        console.log(matchingFood);


            // 1 - select the ingredient ==> done, we pass it as an argument of the function
            // 2 - Create a filtered array WITHOUT the food to be deleted from the list (array.filter)
            const ingredientsUpdated = foodArray.filter(ingredient => {
                return ingredient !== foodToDelete
            })
            console.log(`ingredients - 1 ingredient: ${ingredientsUpdated}`)
            // 3 - We update ingredients with this new array (this array excludes the food to be deleted).
            updatingFunction(ingredientsUpdated);
    };



    return ( 
        <>
            <div>
                {/*If there the user has no food stock for this category(in other words if the array matchingFood has no length) we display "Nada for Now", otherwise, we map the array.  */}
                <h4>You current food stock</h4>
                {matchingFood.length === 0 ? (
                    <p>Nada for now</p>
                ) : (
                    matchingFood.map(currentIng => (
                        <div key={currentIng}>
                            <span>{currentIng}</span>
                            <button onClick={() => deleteIngredient(matchingFood, currentIng, setMatchingFood )}> - </button>
                            <br/>
                        </div>
                    ))
                )}  
            </div>
            <div>
                <h4>Food added</h4>
                {ingredients.map(ingredient => (
                    <div key={ingredient}>
                        <span>{ingredient}</span>
                        <button onClick={() => deleteIngredient(ingredients, ingredient, ingredientUpdater)}> - </button>
                        <br/>
                    </div>
                ))}
            </div>
        </>
    /* We use array.map here to cycle in the ingredients chosen by the user */

    );
}
 
export default IngredientsList;