const Category = require("../../models/categories");
const Ingredient = require("../../models/ingredients");

// CHECK THE INGREDIENTS ADDED IN THE SUBMITTED CATEGORY ===> 1 INGREDIENT CAN ONLY BE IN 1 CATEGORY.
// When we add a newCategory, we have to check that its ingredients only belong to him (for instance, tomato pulp CAN'T BE in the category Beverage and Veggies).
// If these ingredients are already part of any other categorie :
//  - we remove them from these categories


module.exports = {

    
    checkDuplicateIngredientsInCategories : async(categorySubmitted) => {
        const allCategories = await Category.find(); 
        const ingredientToCheck = categorySubmitted.ingredients;

        // We will use this hashTable to check the property ingredient of each categorie
        const ingHashTable = {};

        // a - We populate the hashTable. 1 ingredient of ingredientToCheck = 1 property of the hashTable.
        for (let ingredient of ingredientToCheck) {
            ingHashTable[ingredient] = true;
        };

        for (let category of allCategories) {
            for (let foodToCheck of category.ingredients) {
                // b - If one of them have an ingredient is in the ingHashTable, we have a match
                if (ingHashTable[foodToCheck]) {
                    // c - we remove this ingredient from the category being checked.
                    const cleanedIngredient = category.ingredients.filter(ingredient => {
                        return ingredient != foodToCheck;
                    })
                    // d - We set this purged array in the property ingredients of the category being checked
                    const cleanedCategory = await Category.findByIdAndUpdate(category._id, {
                        $set : {
                            ingredients : cleanedIngredient
                        }
                    },
                    {new : true}
                    );
                }
            }
        };
    },

    // FIND THE INGREDIENT OBJECT MATCHING WITH THE IDs STORED IN THE CATEGORY SUBMITTED

    find_matching_ingredient : async(categorySubmitted) => {
        const ingredientForThisCategory = [];

        for (let ingredient of categorySubmitted.ingredients) {
            const ing = await Ingredient.findById(ingredient);
            ingredientForThisCategory.push(ing._id);
        };
        return ingredientForThisCategory;
    },

    // TO CREATE A CATEGORY
    create_category : async(categorySubmitted) => {
        const newCategory = await Category.create({
            name : categorySubmitted.name,
            ingredients : await find_matching_ingredient(categorySubmitted),      // 3 - We look for the matching ingredients in the DB and we return them with this function.                         
            categoryPicture : categorySubmitted.categoryPicture,
            description : categorySubmitted.description
        });
        return newCategory;
    },

    // TO UPDATE A CATEGORY
    update_category : async(category_to_update, ingredients_to_set_for_category) => {
        const updatedCategory = await Category.findByIdAndUpdate(category_to_update._id, {
            $set : {
                name : category_to_update.name,
                ingredients : await ingredients_to_set_for_category,
                categoryPicture : category_to_update.categoryPicture,
                description : category_to_update.description
            },
        },
        {new : true}
        )
        return updatedCategory;
    },


    // ADD THE NEW_UPDATED CATEGORIES TO INGREDIENTS (to call after creating / updating the category)

    add_category_to_ing : async(category_created_updated) => {
        console.log(`category_created_updated :${category_created_updated}`);
        const ingredientsId = category_created_updated.ingredients;
        console.log(`ingredientsId: ${ingredientsId}`);
        for (let id of ingredientsId) {
            const ingNewCategory = await Ingredient.findByIdAndUpdate(id, {
                $set : {
                    category : await category_created_updated,
                }
            },
            {new : true}
            )
        };     
    },



    // TO ADD THE NEW CATEGORY TO THE RELATED INGREDIENTS. 
    // to identify the ingredients to move to category : no_category

    get_ingredients_for_no_category : async(category_being_updated, old_version_ingredients) => {
        // 1 - we feed this hashTable with the ingredients submitted by the user for this category
        const category_targeted = await Category.findById(category_being_updated._id);
        const ingredients_confirmed_by_admin = category_being_updated.ingredients;
        
        const check_hash_table = {};
        const ing_without_category = [];   // we will add the ingredient to discard here.

        // 1 - We create a hashTable with these ingredients.
        for (let ingredient of ingredients_confirmed_by_admin) {
            console.log(`HASHO TABOBOLO : ${ingredient}`);
            check_hash_table[ingredient] = true;
        };
        console.log(`the hashTable : ${JSON.stringify(check_hash_table)}`);

        for (let old_ingredients of old_version_ingredients) {
            // The ingredient is not in the hash_table the user didn't select it during the update. ingredient to discard in no category
            if (!check_hash_table[old_ingredients]) {
                ing_without_category.push(old_ingredients);
            }
        };  
        return ing_without_category; 
    }
}