import UserContext from "../../Context/UserContext"
import React, { useContext} from "react";


const IngredientsList = ({ingredients, ingredientUpdater, catIng, ownedIngredients, setOwnedIngredients, stock, setStock}) => {
    // To set and update the user details (stored in the UserContext).
    const {userAccount, setUserAccount} = useContext(UserContext)
 

// BUILD THE MATCHING FOOD ARRAY : This array display the ingredients already owned by the user.

    // 1 - Take all the ingredients from the given category
    // We get them using catIng (props from IngredientsSelection)

    const userStock = userAccount.content.stock;

    // 2 - Check the user stock with FOR - FOR - IF (The performance can be improved here - gonna check that later)
    const superLoops = () => {


        // if(userStock) is super useful. With that, we can wait that the userStock is loaded before executing "the meat of the code"
        if (userAccount.content) {
            for (let i = 0 ; i < catIng.length ; i++) {
                for (let j = 0 ; j < userStock.length ; j++) {
                    // When there is a match,it means that an ingredients from the user stock belongs to this category.
                    // We add the name of the food owned by the user to the state ownedIngredients (using setOwnedIngredients) 
                    if (catIng[i] === userStock[j].ingredient._id) {
                        setOwnedIngredients(ownedIngredients => [
                            ...ownedIngredients,
                            {
                                name : userStock[j].ingredient.name,
                                quantity : userStock[j].quantity,
                                unit : userStock[j].unit
                            }
                            ]
                        )
                    }
                }
            }
        } else {
            console.log ("userAccount is not ready yet!")
        }
    }


    React.useEffect(() => {
        superLoops();
        return () => {
            // to clean the function when the component is unmounted. Super important to avoid duplicates in the array ownedIngredients.
            setOwnedIngredients([]);
        }
    }, []);
 

// DELETE NEW INGREDIENTS AND USER INGREDIENT WITH ONE CLICK
    // Argument 1 : The array in which the food to delete is located | Argument 2 : the food to delete | Argument 3 : We use this function to update the state and get an array WITHOUT the food to delete
    const deleteIngredient = (foodArray, foodToDelete, updatingFunction) => {

        // 1 - select the ingredient (we already passed it as an argument of the function)
        // 2 - DELETE FROM INGREDIENT LIST
            // a - Create a filtered array WITHOUT the food to be deleted from the list (array.filter)
            const ingredientsUpdated = foodArray.filter(ingredient => {
                return ingredient !== foodToDelete
            })
            console.log(`1 ingredient has been deleted from the food stock: ${ingredientsUpdated}`)
            // b - We update ingredients with this new array (this array excludes the food to be deleted).
            updatingFunction(ingredientsUpdated);

        // 3 - DELETE FROM THE STATE "STOCK"
            // a - Create a filtered array including the whole Stock WITHOUT the ingredient to be deleted
            const stockUpdated = stock.filter(ingredient => {
                return ingredient !== foodToDelete 
            })
            // b - We update the stock
            setStock(stockUpdated);
    };



    return ( 
        <>
            <div>
                {/*If there the user has no food stock for this category(in other words if the array ownedIngredients has no length) we display "Nada for Now", otherwise, we map the array.  */}
                <h4>You current food stock</h4>
                {ownedIngredients.length === 0 ? (
                    <p>Nada for now</p>
                ) : (
                    ownedIngredients.map(currentIng => (
                        <div key={currentIng.name}>
                            <span>{currentIng.name}  </span>
                            <span>{currentIng.quantity} </span>
                            <span>{currentIng.unit}</span>
                            <button onClick={() => deleteIngredient(ownedIngredients, currentIng, setOwnedIngredients)}> - </button>
                            <br/>
                        </div>
                    ))
                )}  
            </div>
            <div>
                <h4>Food added</h4>
                {ingredients.map(ingredient => (
                    <div key={ingredient.name}>
                        <span>{ingredient.name} </span>
                        <span>{ingredient.quantity} </span>
                        <span>{ingredient.unit}</span>
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