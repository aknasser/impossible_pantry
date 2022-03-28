const Category = require("../models/categories");
const Ingredient = require("../models/ingredients");
const helpers_style = require("./helpers_functions/styles_functions");
const helpers = require("./helpers_functions/categories_functions");



module.exports = {
    retrieveCategory : async (req, res, next) => {
        const allCategory = await Category.find({});
        res.locals.toConvert = allCategory;   // On cale allCategory dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     
    selectedCategory : async(req, res, next) => {
        const idCategory = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenCategory = await Category.findById(idCategory)
        res.locals.toConvert = chosenCategory;
        next();
    },

    newCategory : async(req, res) => {
        const newCategory = req.body;

    // We want to make sure that one ingredient is present in only 1 category.
        // 1 - We check the properties ingredients of the existing categories       
        helpers.checkDuplicateIngredientsInCategories(newCategory);
                
        // 2 - We create the new entry for category
        const newEntry = await helpers.create_category(newCategory);

        // 3 - We add this new category to the ingredients included in newCategory.ingredients
        helpers.add_category_to_ing(newEntry);
        res.send("new entry created!");
    },

    updatedCategory : async(req, res) => {
        let categoryUpdated = req.body
        console.log(`The category to update : ${categoryUpdated.name}`);
        const no_category = await Category.findOne({name : "No Category"});
        const old_version_category = await Category.findById(categoryUpdated._id);

        // 1 - We store the "old version" of the property ingredients. We will need that later to execute the function get_ingrdients_for_no_category.
        const ingredients_of_category_before_update = old_version_category.ingredients;
        console.log(`RRRRRRRR : ${ingredients_of_category_before_update}`);
        
        // 2 - We check the properties ingredients of the existing categories       
        helpers.checkDuplicateIngredientsInCategories(categoryUpdated);

        // 3a - We add the ingredients confirmed by the user to the category targeted.
        const updated_category = await helpers.update_category(categoryUpdated, await helpers.find_matching_ingredient(categoryUpdated));

        // 3b - We define this category as the property "category" of the related ingredients(To connect them)
        helpers.add_category_to_ing(updated_category);

        // 4 - We store all the ingredients to remove from the updated category in this variable.
        const ingredient_for_no_category = await helpers.get_ingredients_for_no_category(categoryUpdated, ingredients_of_category_before_update);
        console.log(`ingredient_for_no_category : ${ingredient_for_no_category}`);

        // 5a - We add the ingredients discarded to the category "NO CATEGORY"
        const updated_garbage_category = await helpers.update_category(no_category, ingredient_for_no_category);

        // 5b - We define No Category as the property "category" of these ingredients(To connect them)
        helpers.add_category_to_ing(updated_garbage_category);

/*         console.log(`the updated entry : ${updated_category}`)*/
        res.send("entry updated!");
    },




    deletedObject : async(req, res) => {
        const category_to_delete = req.body;
        helpers_style.clean_entries_in_others_collections_after_deletion("category", category_to_delete._id, Category, Ingredient, "No Category");
        const entryToDelete = await Category.findByIdAndRemove(category_to_delete._id);
        res.send("entry removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

