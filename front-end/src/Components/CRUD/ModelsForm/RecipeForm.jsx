import * as React from 'react';
import useCountries from '../../../CustomHooks/useCountries';
import StepsList from './RecipesFormModules/StepsList';
import { check_duplicate_among_ingredients_selected, getRightUnit, get_all_ingredients_name } from '../../../Helpers/functions';


const RecipeForm = ({endpoint, submitNewRecipe, allIngredients, allStyles, objectToUpdate, selectedAndCheckedInput}) => {
    
    const [countries, setCountries] = useCountries();

    const newRecipeReducer = (state, action) => {
        switch (action.type) {
            case "UPDATE_VALUE":                    // When the user is changing an input  
                return {
                    ...state, 
                    content : {
                        ...state.content,
                        [action.payload.propertyToUpdate] : action.payload.value
                    }
                };

            case "UPDATE_STEP": 
                return {
                    ...state,
                    [action.payload.propertyToUpdate] : action.payload.value
                };

            case "UPDATE_INGREDIENT_NAME_OR_UNIT": // valid
                return {
                    ...state,
                    ingredientTyped : {
                        ...state.ingredientTyped,
                        ingredient : {
                            ...state.ingredientTyped.ingredient,
                            [action.payload.propertyToUpdate] : action.payload.value
                        }
                    },
                };

            case "UPDATE_INGREDIENT_QUANTITY":
                return {
                    ...state,
                    ingredientTyped : {
                        ...state.ingredientTyped,
                        quantity : action.payload.value
                        }
                };

            case "ADD_STEP":
                return {
                    ...state,
                    content : {
                        ...state.content,
                        steps : [                               // We keep all the element of steps and add the step the user just added.
                            ...state.content.steps,
                            action.payload.value
                        ]
                    },
                    stepTyped : "",                         // Once we have added a new step, we reset the input. The user can start typing a new step
                };

            case "ADD_INGREDIENT":
                return {
                    ...state,
                    content : {
                        ...state.content,
                        ingredientsNeeded : [
                            ...state.content.ingredientsNeeded,
                            action.payload.value
                        ]
                    },
                    ingredientTyped : {
                        ingredient : {
                            name : "",
                            unit : "Choose an ingredient"
                        },
                        quantity : 0
                    },
                };

            case "REMOVE_STEP_OR_INGREDIENT":
                return {
                    ...state,
                    content : {
                        ...state.content,
                        [action.payload.propertyToUpdate] : action.payload.value            // Here payload.value = steps WITHOUT the value to delete.
                    },
                };
        }
    };

    const [newRecipe, dispatchNewRecipe] = React.useReducer(
        newRecipeReducer,
        {
            content : objectToUpdate || {
                name : "",
                intro : "",
                steps : [],                     // contains an array of instructions (strings).
                country : "",
                style : "",
                difficulty : "",
                pictureUrl : "",
                mainIngredient :"",
                ingredientsNeeded : []          // This array is a collection of object with 3 properties (ingredient, quantity and unit).        
            },
            stepTyped : "",                        // to track the value of the state the user is typing currently.
            ingredientTyped : {
                ingredient : {
                    name : "",
                    unit:"", 
                },
                quantity : "N/A"
            }
        } 
    ); 


    // OPTIONAL - To check the value of New Recipe during the component lifecycle
        React.useEffect (() => {
            console.log("NEWRECIPE : " +  JSON.stringify(newRecipe))
        }, [newRecipe]);



    // update the value of newRecipe while the user is typing (controlled input).
    const updateValue = (event, actionType) => {                        // actionType to tell the reducer what action needs to be executed
        dispatchNewRecipe({
            type: actionType,
            payload : {
                propertyToUpdate: event.target.name,
                value : event.target.value
            }
        })
        console.log(`name : ${event.target.name} || value : ${event.target.value}`);
    };


    // update the value of ingredientTyped while the user is typing (controlled input). 
    // property is an optionnal parameter we use it when we update the name (or the unit through the helper functions get_right_unit)
    const updateIngredient = (event, action_type, property) => {
        dispatchNewRecipe({
            type : action_type,
            payload : {
                value : event.target.value,
                propertyToUpdate : property 
            }
        })
    };
    
    // ADD NEW STEPS OR INGREDIENT NEEDED
    // triggered when the user click on the button "add Steps". We add the step he has just typed to the property "steps" of newRecipe(array). A new step has been added!
    const add_step_or_ingredient = (event, action_type, value_to_add) => {
        event.preventDefault();
    // To check duplicate and execute the form if the ingredient submitted by the user is correct

        dispatchNewRecipe({
            type : action_type,
            payload : {
                value  : value_to_add
            }
        })
        console.log("step added!!!")
    };


    const add_ingredient_to_recipe = async(event, action_type, value_to_add) => {
        event.preventDefault();
        if (newRecipe.content.ingredientsNeeded.length <= 0) {
            add_step_or_ingredient(event, action_type, value_to_add);
        } else {
            const unique_ingredient = check_duplicate_among_ingredients_selected(get_all_ingredients_name(newRecipe.content.ingredientsNeeded), newRecipe.ingredientTyped.ingredient.name);
            if (!unique_ingredient) {
                alert("this ingredient is already included in the recipe!")
            }
            if (unique_ingredient) {
                add_step_or_ingredient(event, action_type, value_to_add);
            } 
        }
    };

    React.useEffect(() => {
        console.log("Coucou!")
        getRightUnit (endpoint, dispatchNewRecipe, newRecipe.ingredientTyped);
    }, [newRecipe.ingredientTyped.ingredient.name])

    // DELETE STEP / INGREDIENT ADDED
    // We pass this function to the Component StepsList. Delete the selected step / ingredientNeeded when the user click on it.
    const deleteItem = (event, actionType, itemToDelete, arrayToCheck, propertyToUpdate) => {
        event.preventDefault();
        const cleanedArray = arrayToCheck.filter(item => {
            return item != itemToDelete;
        });
        dispatchNewRecipe({
            type : actionType,
            payload : {
                propertyToUpdate : propertyToUpdate,
                value : cleanedArray
            }
        });
    };

    // TO automatically check the checkboxes / select the options matching the entry value for a given property.
    React.useEffect(() => {
        if (countries) {
            selectedAndCheckedInput(objectToUpdate, "select")
        }
    },[countries, objectToUpdate])



    return (
        <>
            <form onSubmit= {(event) => submitNewRecipe(event, newRecipe.content ,"recipes")}>  {/* ARG 1: Event || ARG 2 : The data to post to the back-end || ARG 3 : the model name in the back-end. We need this information to reach the right ENDPOINT in the back-end. */}
                <label htmlFor="name">Name</label>
                {!newRecipe ? (
                    <input type="text" name ="name" value="Dodo" onChange ={(event) => (event) => updateValue(event, "UPDATE_VALUE")} />
                ) : (
                    <>
                        <input type="text" name ="name" value={newRecipe.content.name} onChange = {(event) => updateValue(event, "UPDATE_VALUE")} />
                    </>

                )}


                <label htmlFor="intro">Intro</label>
                <input type="text" name ="intro" value={newRecipe.content.intro} onChange = {(event) => updateValue(event, "UPDATE_VALUE")}/>

                <label htmlFor="pictureUrl">Picture URL</label>
                <input type="text" name ="pictureUrl" value={newRecipe.content.pictureUrl} onChange = {(event) => updateValue(event, "UPDATE_VALUE")}/>

                <label htmlFor="country">Country</label>
                {!countries ? (
                    <p>Loading</p>
                ) : (
                    <select name="country" id="" onChange = {(event) => updateValue(event, "UPDATE_VALUE")}>
                    <option value="">---Pick a country---</option>
                    {countries.map(country => (
                        <option value={country.name} key= {country.name}>{country.name}</option>
                    ) )}                
                    </select>
                )}

                <label htmlFor="style">Style</label>
                <select name="style" id="" onChange = {(event) => updateValue(event, "UPDATE_VALUE")}>
                <option value="">---Pick a style---</option>
                {allStyles.map(style => (
                    <option value={style.name} key= {style._id}>{style.name}</option>
                ) )}
                </select>

                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" id="" onChange = {(event) => updateValue(event, "UPDATE_VALUE")}>
                    <option value="">---Pick a number---</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>

                </select>

                <label htmlFor="mainIngredient">Main Ingredient</label>
                <select name="mainIngredient" id="" onChange = {(event) => updateValue(event, "UPDATE_VALUE")}>
                    <option value="">---Pick an ingredient---</option>
                    {allIngredients.map(ingredient => (
                        <option key= {ingredient._id} value={ingredient.name}>{ingredient.name}</option>
                    ))}
                </select>

                <label htmlFor="stepTyped">Steps</label>
                <input type="text" name="stepTyped" value={newRecipe.stepTyped} onChange = {(event) => updateValue(event, "UPDATE_STEP")}/>
                <button onClick={(event) => add_step_or_ingredient(event, "ADD_STEP", newRecipe.stepTyped)}>Confirm step</button>

                <StepsList
                    steps = {newRecipe.content.steps}
/*                  ingredients = {newRecipe.content.ingredientsNeeded} // we don't want to display the ingredientsNeeded here (we do that below) */
                    deleteItem = {deleteItem}
                />

                <h5>Ingredients Needed</h5>
                <label htmlFor="ingredient">Ingredient</label>
                <select name="ingredient" id="" onChange={(event) => updateIngredient(event, "UPDATE_INGREDIENT_NAME_OR_UNIT", "name")}>
                    <option value="">---Pick an ingredient---</option>
                    {allIngredients.map(ingredient => (
                        <option key= {ingredient._id} value={ingredient.name}>{ingredient.name}</option>
                    ))}
                </select>                
                <label htmlFor="quantity">Quantity</label>
                <input type="text" name ="quantity" value = {newRecipe.ingredientTyped.quantity} onChange={(event) => updateIngredient(event, "UPDATE_INGREDIENT_QUANTITY")} />
                <label htmlFor="unit">Unit</label>
                <input type="text" value={newRecipe.ingredientTyped.ingredient.unit} readOnly />


                <button onClick={(event) => add_ingredient_to_recipe(event, "ADD_INGREDIENT", newRecipe.ingredientTyped)}>Confirm ingredient</button>
                
                <StepsList
/*                  steps = {[]}          // we don't want to display the recipe steps here (we do that above).  */ 
                    ingredients = {newRecipe.content.ingredientsNeeded}
                    deleteItem = {deleteItem}
                />
                <input type="submit" value = "Add New Recipe" />
            </form>
        </>
    );
}
 
export default RecipeForm;