const Category = require("../../models/categories");
const Ingredient = require("../../models/ingredients");




module.exports = {

// CHECK THE INGREDIENTS ADDED IN THE SUBMITTED CATEGORY ===> 1 INGREDIENT CAN ONLY BE IN 1 CATEGORY.
// When we add a newCategory, we have to check that its ingredients only belong to him (for instance, tomato pulp CAN'T BE in the category Beverage and Veggies).
// If these ingredients are already part of any other categorie :
//  - we remove them from these categories
//  - we can then add them to the new category

    check_duplicate_ingredients_in_categories : async(category_submitted) => {
        const all_categories = await Category.find(); 
        const ingredient_to_check = category_submitted.ingredients;

        // We will use this hashTable to check the property ingredient of each categorie
        const ing_hash_table = {};

        // a - We populate the hashTable. 1 ingredient of ingredient_to_check = 1 property of the hashTable.
        for (let ingredient of ingredient_to_check) {
            ing_hash_table[ingredient] = true;
        };

        for (let category of all_categories) {
            for (let food_to_check of category.ingredients) {
                // b - If one of them have an ingredient is in the ing_hash_table, we have a match
                if (ing_hash_table[food_to_check]) {
                    // c - we remove this ingredient from the category being checked.
                    const cleaned_ingredients = category.ingredients.filter(ingredient => {
                        return ingredient != food_to_check;
                    })
                    // d - We set this purged array in the property ingredients of the category being checked
                    const cleaned_category = await Category.findByIdAndUpdate(category._id, {
                        $set : {
                            ingredients : cleaned_ingredients
                        }
                    },
                    {new : true}
                    );
                }
            }
        };
    },

    // FIND THE INGREDIENTS OBJECT MATCHING WITH THE IDs STORED IN THE CATEGORY SUBMITTED
    // return an array that stores all the object ID of all these ingredients.

    find_ingredient_id_category : async(category_submitted) => {
        const ingredients_id_for_this_category = [];

        for (let ingredient of category_submitted.ingredients) {
            const ing = await Ingredient.findById(ingredient);
            ingredients_id_for_this_category.push(ing._id);
        };
        return ingredients_id_for_this_category;
    },

    // TO CREATE A CATEGORY
    create_category : async(category_submitted) => {
        const newCategory = await Category.create({
            name : category_submitted.name,
            ingredients : await find_ingredient_id_category(category_submitted),      // 3 - We look for the matching ingredients in the DB and we return them with this function.                         
            categoryPicture : category_submitted.categoryPicture,
            description : category_submitted.description
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
        // We add the new / updated category to the right ingredient
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
    // We compare the new version of the category and its old version. 
    // If an ingredient is in the old version but absent of the new version ==> It needs to move to NO CATEGORY. 
    // return an array of ingredients to add to the category : NO CATEGORY

    get_ingredients_for_no_category : async(category_being_updated, old_version_ingredients) => {
        // 1 - we feed this hashTable with the ingredients submitted by the user for this category
        const category_targeted = await Category.findById(category_being_updated._id);
        const ingredients_confirmed_by_admin = category_being_updated.ingredients;
        
        const ing_to_add_to_no_category = [];   // we will add the ingredient to discard here.

        // 1 - We create a hashTable with these ingredients.
        const check_hash_table = {};
        for (let ingredient of ingredients_confirmed_by_admin) {
            console.log(`HASHO TABOBOLO : ${ingredient}`);
            check_hash_table[ingredient] = true;
        };
        console.log(`the hashTable : ${JSON.stringify(check_hash_table)}`);

        for (let old_ingredients of old_version_ingredients) {
            // IF The ingredient is not in the hash_table the user didn't select it during the update. ingredient to discard in no category
            if (!check_hash_table[old_ingredients]) {
                ing_to_add_to_no_category.push(old_ingredients);
            }
        };  
        return ing_to_add_to_no_category; 
    }
}