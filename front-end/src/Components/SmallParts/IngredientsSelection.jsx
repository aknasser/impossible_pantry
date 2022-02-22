import axios from 'axios';
import * as React from 'react';
import IngredientsList from "./IngredientsList";




const IngredientsSelection = ({category, endpoint, stock, setStock}) => {




// START - COLLECT ALL THE INGREDIENTS FOR A GIVEN CATEGORY
// These ingredients are included in the props category (coming from the component Pantry.jsx)

// This variable includes all the ingredients available for a given category.
    const [categoryIng, setCategoryIng] = React.useState([]);



    React.useEffect(() => {
        //isMounted will help us to control the state of the component and set the clean-up function (the return function at the end of fechCatIng)
        let isMounted = true;

        const fetchCatIng = async() => {
            try {
                // we loop in the ingredients included in category.
                for (let i = 0; i < category.ingredients.length; i++) {
                    const ingFetched = await axios.get(`${endpoint}/ingredients/id/${category.ingredients[i]}`, {crossdomain : true});
                    
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

    //CLEAN-UP FUNCTION. We used is to set isMounted = false; "block" the fetch while waiting for the mounting component. 
        return () => {
            isMounted = false;
            console.log("Component not mounted yet")
            // When the component is unmounted, we empty the state categoryIng to avoid duplicates (can happens sometime in the lifecycle)
             setCategoryIng([]);
        };
    }, []);

// END - COLLECT ALL THE INGREDIENT FOR A GIVEN CATEGORY


    


// NEWINGREDIENTS - This variable includes the ingredients added by the user to its foodstock.
    const [newIngredients, setNewIngredients] = React.useState([]);


// INGREDIENTTYPED - This variable contains the input typed by the user in the field with name="ingredient". 
// Everytime the user type a new letter in this input, we update ingredientTyped (thanks onChange)
// This state will be passed as a props of IngredientsList (later in this code).   

    const [ingredientTyped, setIngredientTyped] = React.useState({
        ingredient : {
            name : "",
            unit:"", 
        },
        quantity : "N/A"
    }); 
    
// OWNEDINGREDIENTS -  food already owned by the user when start the app (come from user.content.stock)
// We create this state and we display/update it in IngredientsList (we pass it as a props later in this code). 
    const [ownedIngredients, setOwnedIngredients] = React.useState([]);


// VALID ENTRY CHECKER FUNCTION (called in validationIngredients) - to check if the typed ingredient is Valid (= part of categoryIng )
/* We use it when :  
1 - the user submit an ingredient after typing it
2 - While the user his typing to fetch the corresponding unit IF we the ingredient is valid(meaning checkValidation return true).
 */  


    const checkValidation = (controller) =>  {

        for (let i = 0; i < categoryIng.length; i++) {
            if (ingredientTyped.ingredient.name === categoryIng[i].name) {
                // 2 - We execute the code below
                controller = true;
                console.log("We found a match"); 
                break; // to escape the loop once we find a match among categorIng
            }
        }
        return controller;      
    }



// DUPLICATE CHECKER FUNCTION (called in validationIngredients)
    const duplicateChecker = (controller, arrayToCheck) => {
        // We loop in the array to check...
        for (let i = 0; i < arrayToCheck.length; i++) {
            // If the ingredientTyped is already in the array to check...
            if (ingredientTyped.ingredient.name === arrayToCheck[i].ingredient.name) {
                controller = false;
                break; // No need to keep looping if we find a duplicate. 
                // Otherwise, if the array IS NOT in the array to check...
            } else {
                controller = true;
            } 
        }
        return controller;
    }




// FUNCTION TO UPDATE INGREDIENTLIST
    const validationIngredients = (event) => {
        event.preventDefault();


        // validIngredient is a controller. We use it to check whether the ingredient typed is available in this category. 
        // isUniqueNewIng and isUniqueUserIng are "controllers". We use them to check duplicates. They will remain true IF ingredientTyped is UNIQUE in newIngredients and ownedIngredients
        let validIngredient = false;
        let isUniqueNewIng = true;
        let isUniqueUserIng = true;

    // A - CHECK IF INGREDIENT IS VALID

        validIngredient = checkValidation(validIngredient);

    // B- CHECK IF INGREDIENT IS A DUPLICATE (NEW INGREDIENT)

        isUniqueNewIng = duplicateChecker(isUniqueNewIng, newIngredients);
        isUniqueUserIng = duplicateChecker(isUniqueNewIng, ownedIngredients);

        // a - If we don't find any equality, validIngredient remains false = We sent an alert to the user. 
        if (!validIngredient) {
            console.log(validIngredient);
            alert(`${ingredientTyped.ingredient.name} is not a valid ingredient for this category. Please correct your entry or pick another category.`);
        }

        // b - For the food recently added by the user :If we find an object with the same name , isUniqueNewIng IS false = We sent an alert to the user.         
        if (!isUniqueNewIng) {
            alert(`you've added ${ingredientTyped.ingredient.name} a bit earlier. Please pick another ingredient.`);
        }

        // c - For the food already owned by the user : If we find an object with the same name , isUniqueUserIng IS false = We sent an alert to the user.         

        if (!isUniqueUserIng) {
            alert(`${ingredientTyped.ingredient.name} is already in the food stock. Please add another ingredient.`);
        }

        // d - When these 3 conditions are met, we execute this code to add the ingredientTyped to the list of newIngredients.
        if (validIngredient && isUniqueNewIng && isUniqueUserIng) {
            setNewIngredients(newIngredients => [...newIngredients, ingredientTyped])
        } 
    };


// UNIT UPDATING : We want to update the unit dynamically => When the user types a valid ingredient, we fetch the corresponding unit(unit input is a readonly input - the user can't change it himself).

    React.useEffect(() => {

        // 1 - We create a function to fetch the right unit. This effect is triggered eveytime ingredientTyped changed [dependency]. 
        const getRightUnit = async () => {

            let ingTypedValid = false;
            ingTypedValid = checkValidation(ingTypedValid);

            // b - IF  ingredientTyped is a valid ingredient we start the request.  We check that with the function
            if (ingTypedValid) {
                try {
                    console.log("At least we are trying...")
                    // c - ingToSearch contains the value to look for (the ingredientTyped) if nothing has been typed yet, we give it the value oupsie. This tip enable us to bypass 404 error during the GET Request
                    const ingToSearch = ingredientTyped.ingredient.name || "oupsie";
    
                    const fetchUnit = await axios.get(`${endpoint}/ingredients/unit/${ingToSearch}`, {crossdomain : true})
                    // d - we collect this unit and update the state of ingredientTyped. The value displayed for the unit input (read-only) change automatically as a consequence 
                    if(fetchUnit) {
                        const rightUnit =fetchUnit.data;
                        console.log (`unit updated`)            
                        setIngredientTyped({
                            ...ingredientTyped,
                            ingredient : {
                                ...ingredientTyped.ingredient,
                                unit : rightUnit
                            }
                            });
                    }
                } catch (e) {
                    console.log(`Issue to fetch the right unit : ${e}`);
                    setIngredientTyped({
                        ...ingredientTyped,
                        unit : "scheiiiiissss!!!"
                    })
                } 

                }
            }
        getRightUnit();
    }, [endpoint, ingredientTyped.ingredient.name])




// CONTROLLED INPUT : We use this function to constantly update what the user is TYPING.
    const ingredientUpdater = (event) => {
        setIngredientTyped({
            ...ingredientTyped,
            ingredient : 
                {
                ...ingredientTyped.ingredient,
                [event.target.name] : event.target.value,
                }
            })  
    };

    const quantityUpdater = (event) => {
        setIngredientTyped({
            ...ingredientTyped,
            quantity : event.target.value
            })  
    }


// FEED THE STOCK - As the user update his stock( ownedIngredients and NewIngredient), we update the variable stock, with setStock.
// we use stock in the parent component Pantry, during the POST Request
// /!\ At this stage the stock contains duplicates. We will clean them when the user start the Post Request (in Pantry, parent component.)

    React.useEffect( () => {
        setStock([...stock, ...ownedIngredients, ...newIngredients]);
    console.log(`CONTENT NewIngredients: ${JSON.stringify(newIngredients)}`);
    }, [ownedIngredients, newIngredients]); 


// CHECKING LOG - With this useEffect, we check the value of stock everytime when there is a changed
    React.useEffect( () => {
        console.log(`QTY STOCK : ${stock.length}`)
        console.log(`STOCK : ${JSON.stringify(stock)}`)
        for (let food of stock) {
            console.log(`Name of the ingredient :${JSON.stringify(food.ingredient.name)}`)
        }
    }, [stock])








    return (
        <div>
{/*         {stock.map(foodStock => (
                <h6 key= {foodStock.ingredient.name}>{foodStock.ingredient.name}</h6>
            ))} */}
            <h3>{category.name}</h3>
            <img src={category.categoryPicture} alt="Category" />
            <h4>{category.description}</h4>
            <form action="" onSubmit={validationIngredients}>
                <label htmlFor="name">In your kitchen...</label>
                <input list={category.name} id={category._id} name="name" onChange={ingredientUpdater} />
                <datalist id={category.name}>
                    {categoryIng.map(ingredient => (
                        <option value={ingredient.name}  key={ingredient._id}  />
                    ))} 
                </datalist>
                <label htmlFor="quantity">Quantity</label>
                <input type="text" id="quantity" name="quantity" onChange={quantityUpdater} />
                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" value={ingredientTyped.ingredient.unit} name="unit" readOnly onChange={ingredientUpdater} />
                <input type="submit" />
            </form>

            {/* This component display the food available for the user (ingredients already owned + ingredients added recently) */}
            <IngredientsList 
                ingredients = {newIngredients} // All the new ingredients (the ingredients we are adding while filling the form)
                ingredientUpdater = {setNewIngredients} // set updater Function. We use this function in IngredientList to delete ingredients if needed.
                catIng = {category.ingredients} // all the ingredients for a given category
                ownedIngredients = {ownedIngredients}  // The food owned by the user. Fetched from the DB
                setOwnedIngredients = {setOwnedIngredients} // The state updater funcion for ownedIngredients. For example, deleting food the user has consumed since his last login
                stock = {stock}
                setStock = {setStock}
            />
        </div>
    );
}
 
export default IngredientsSelection;