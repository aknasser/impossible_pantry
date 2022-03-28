const Recipe = require("../../models/recipes");
const Ingredient = require("../../models/ingredients")
const User = require("../../models/users")



module.exports = {
    // FIND THE RIGHT OBJECT ID FOR STYLE AND INGREDIENT 
// We use it when we create / update recipes

    findMatchingId : async(model, property, recipeObject) => {
        const matchingId = await model.findOne({name : recipeObject[property]})
        return matchingId;
    },


    // To FIND THE RIGHT OBJECT ID AND INSERT IT IN THE PROPERTY INGREDIENTNEEDED WHEN WE CREATE / UPDATE AN USER
    // When the user create 
    // We need to do it before creating / updating recipes.

    findAllIngredientsNeededId : async(recipeObject) => {
        // 1 - We will store the objectID found in this object and return it
        const updatedIngredientsNeeded = []; 
        // 2 - We loop into into the ingredientNeeded.
        for (let i = 0 ; i < recipeObject.ingredientsNeeded.length; i++) {
            const ingToFind = recipeObject.ingredientsNeeded[i].ingredient;  // more convenient 
            let ingredientNeededID;

            // a - If it's an object we have to take the property "name" inside ingToFind. Happens when the ingredient was already part of the recipe 
            if (typeof ingToFind === "object") {                            
                ingredientNeededID = await Ingredient.findOne({name : ingToFind.name})

            // b - If it's a string we have a direct access to the name. Happens when the user has added a new ingredient. We need to find the matching object ID in the collection Ingredient. 
            } else {
                ingredientNeededID = await Ingredient.findOne({name : ingToFind})
            }
            // 3 -  to update the property ingredientsNeeded.ingredient with an objectId.                 
            recipeObject.ingredientsNeeded[i].ingredient = ingredientNeededID;
            // 4 - we push this updated object in updatedIngredientsNeeded
            updatedIngredientsNeeded.push(recipeObject.ingredientsNeeded[i])
        };
        return updatedIngredientsNeeded;
    },


    // REMOVE THE DELETED RECIPE FROM THE array RECIPES COOKED / RECIPES SAVED OF THE USERS.
    // ARG 1 : "string: the name of the property storing the objectId in the model User / Category" | ARG 2 : ID of the object to delete | ARG 3 : The model with the arrays to clean after deletion (user, category)
    // RETURN ==> Nada
    clean_others_collection_arrays_after_deletion : async(name_of_array_to_clean, object_to_delete_id, model_with_array_to_clean) => {
        const all_entries_other_model = await model_with_array_to_clean.find({});
        for (let other_model of all_entries_other_model) {
            for (let element_to_check_in_array_of_other_model of other_model[name_of_array_to_clean]) {
                // 4 - If we find the recipe we just deleted...
                if (element_to_check_in_array_of_other_model.toString() === object_to_delete_id.toString()) {
                    // 5 - we create a "clean" array without this recipe.
                    const clean_recipes = other_model[name_of_array_to_clean].filter(element => {
                        return element.toString() !== object_to_delete_id.toString();
                    })
                    // 6 - we define it as the new value of recipeCooked for the object in the other model.
                    const updated_user = await model_with_array_to_clean.findByIdAndUpdate(other_model._id, {
                        $set : {
                            [name_of_array_to_clean] : clean_recipes,
                        },
                    },
                    {new : true}
                    )
                }
            }
        };
    }
}



