import axios from "axios";


/* VALIDATION AND DUPLICATE FUNCTION
    We use these functions in Pantry and SearchRecipes. They enable us to control : 
      1 - the input typed by the user : The user can only ingredients available in our dataset
      2 - check the duplicate : The user can only submit an ingredient once 
  */
  
  // 1  - Validation Check
        // parameter 1 : valid_entries : The array with all the accepted entries (countries, ingredients, style, difficulty)
        // parameter 2 :  string_to_check : the stringTyped by the user.
        // Return... true if the ingredient match with one of ingredient of this category. Otherwise it returns false.

export const check_validation_ingredients = (valid_entries, string_to_check) =>  {
    for (let i = 0; i < valid_entries.length; i++) {
        if (string_to_check.toLowerCase() === valid_entries[i].name.toLowerCase()) {
            console.log("We found a matching filter!"); 
            return true;      
        }
    }
    return false; 
};
        
    // 2  - Duplicate Check
        // parameter 1 : accepted_entries : The array with the ingredients already typed by the user
        // parameter 2 :  string_to_check : the stringTyped by the user.
        // Return... true if the ingredient match with one of ingredient of this category. Otherwise it returns false.
        
export const check_duplicate_among_ingredients_selected = (array_of_current_ingredient, string_to_check) => {
    console.log("Activated" + JSON.stringify(array_of_current_ingredient));
    if (array_of_current_ingredient.length <= 0) {    // If the accepted_entries is empty, we can't have duplicate, duh!
            return true;
    } else {
        console.log("checking!")
        let hashTable = {};
        for (let element of array_of_current_ingredient) {
                hashTable[element.name] = true;
        }
        if (hashTable[string_to_check]) {
            console.log("Duplicate found!");
            return false;
        }
        return true;
    }
}


// To get the name of all the ingredients in a array.
export const get_all_ingredients_name = (object_with_all_ingredients) => {
    console.log(`object_with_all_ingredients : ${JSON.stringify(object_with_all_ingredients)}`);    
    const all_ing_name = [];
        for (let food of object_with_all_ingredients) {
            all_ing_name.push(food.ingredient);   // If the property name is undefined check the property ingredient.   
        };
        console.log(all_ing_name);
        return all_ing_name; 
};



// Display the right unit when the user choose a valid ingredient in the pantry or when the admin pick an ingredient in RecipeForm(Create or Update Recipes).
// ARG 1 - String : The endpoint  | ARG 2 - Function : The function to update the state of the variable storing the ingredient  | ARG 3 - Object : the ingredient to serve with the right unit (in most case it's called ingredientTyped)

export const getRightUnit = async (endpoint, state_updater_function, ingredient_to_serve_with_unit) => {
        try {   
            console.log(ingredient_to_serve_with_unit.ingredient.name);
            const ingToSearch = ingredient_to_serve_with_unit.ingredient.name || "oupsie";
            const fetchUnit = await axios.get(`${endpoint}/ingredients/unit/${ingToSearch}`, {crossdomain : true})

            if(fetchUnit) {
                const rightUnit = await fetchUnit.data;
                console.log("Something: " + JSON.stringify(rightUnit))
                console.log (`unit updated`)            
                state_updater_function({
                    type : "UPDATE_INGREDIENT_NAME_OR_UNIT",
                    payload : {
                        value : rightUnit,
                        propertyToUpdate : "unit"  
                    }
                });
            }
        } catch (e) {
            console.log(`Issue to fetch the right unit : ${e}`);
        } 
    }
