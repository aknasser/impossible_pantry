const Ingredient = require("../../models/ingredients");
const Category = require("../../models/categories");

module.exports = {

// REMOVE THE INGREDIENT IF IT IS STORED IN ANOTHER CATEGORY (category =/= category_category_to_exclude)
// ARG 1 : ing_to_check_id : id of the ingredient we are updating
// ARG 2 : right_category_for_ing : the only category to store the updated ingredient.
    check_ingredients_in_categories : async(ing_to_check_id, right_category_for_ing) => {
        // 1 - We get all the categories except the categories we just updated (filter)
        const all_categories = await Category.find({});
        const categories_to_review = all_categories.filter(category => {
            return category.name !== right_category_for_ing.name;
        })
        // 2 - For each category we...
        for (let category of categories_to_review) {
            // a - create a hashTable and... 
            const category_hash_table = {};
            // b - store inside it their ingredient as property(object_ID).
            for (let ing of category.ingredients) {
                category_hash_table[ing] = true;
            }
        // c - if hashTable[ing_to_check] exists === our ing_to_check is part of the ingredients stored in this category.
            if (category_hash_table[ing_to_check_id]) {
                // d1 - we remove ing_to_check_id from category.ingredients.
                const filtered_ingredients = category.ingredients.filter(ingredient => {
                    return ingredient != ing_to_check_id;               // Work with != but not with !==...WHY ?
                })
                // d2 - we update the category with this filtered array ingredients.
                const updated_category = await Category.findByIdAndUpdate(category._id, {
                    $set : {
                        ingredients: filtered_ingredients
                    }
                },
                {new : true}
                )
            } else {
                console.log ("NO RENEGADES");
            }
        };
    }
};