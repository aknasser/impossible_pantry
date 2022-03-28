const Ingredient = require("../models/ingredients");
const Category = require("../models/categories");
const helpers = require("./helpers_functions/ingredients_functions");
const recipe_helpers = require("./helpers_functions/recipes_functions");

module.exports = {

    testCookie : async(req, res) => {
        res.cookie("Hero", "Nass La Menace");
        res.send("Babyyyyyy");
    },

// (R OF THE CRUD)
    retrieveIngredient : async (req, res, next) => {
        const allIngredients = await Ingredient.find({}).populate("category");
        res.locals.toConvert = allIngredients;   
        next(); 
     },
     
//(R OF THE CRUD - 1 ENTRY SELECTED)
    selectedIngredient : async(req, res, next) => {
        const idIngredient = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenIngredient = await Ingredient.findById(idIngredient)
        res.locals.toConvert = chosenIngredient;
        next();
    },

// To collect the unit corresponding to the ingredient Typed by the user in the front
    unitFinder : async(req, res) => {
        // 1 - We collect the ingredient from the request params.
        const nameIngredient = req.params.ingredient;
        console.log(`Entry typed by the user : ${nameIngredient}`);
        // 2 - We find the corresponding entry in the collection ingredients in the DB
        const ingredientTargeted = await Ingredient.findOne({ name : nameIngredient});
        
        if (ingredientTargeted) {
            // 3 - We put the unit value in a variable
            const rightUnit =  ingredientTargeted.unit;
            console.log(`The unit found : ${rightUnit}`)
            // 4 - We sent the response to the client : if rightUnit exists, we sent it to the client
            res.json(rightUnit);
        }
    },

// C OF THE CRUD
    newIngredient : async(req, res) => {
        const newIngredient = req.body;

        // 1 - we look for the category selected in the DB
        const categorySelected = await Category.findOne({name :newIngredient.category})
        console.log(categorySelected);

        
        // 2 - We create the new ingredient
        const newEntry = await Ingredient.create({
            name : newIngredient.name,
            price : newIngredient.price,
            scarcity : newIngredient.scarcity,
            fSSIndex : newIngredient.fSSIndex,
            unit : newIngredient.unit,
            category : categorySelected,
            
            
        });

        console.log (`the new entry : ${newEntry}`);

        // 3 - we add this new ingredient to the selected category 
         const categoryToUpdate = await Category.findOneAndUpdate({name :newIngredient.category}, {
            $push : {
                ingredients: newEntry
            }
        },
        {new : true}
        );
        console.log(`The category updated : ${categoryToUpdate}`); 

        res.send("new ingredient created and category updated");

    },

// U OF TH CRUD
    updatedIngredient : async(req, res) => {
        let ingredientUpdated = req.body;
        let ingredientId = ingredientUpdated._id;
        
        // 1 - we identify the matching category in the DB. 
        const rightCategory = await Category.findOne({name : ingredientUpdated.category});

        // 2 - we update the ingredient.
        const ing_to_update = await Ingredient.findByIdAndUpdate(ingredientId, {
            $set : {
                name : ingredientUpdated.name,
                price : ingredientUpdated.price,
                scarcity : ingredientUpdated.scarcity,
                fSSIndex : ingredientUpdated.fSSIndex,
                unit : ingredientUpdated.unit,
                category : await rightCategory,
            },
        },
        {new : true}
        )

        // 3 - we add this ingredient to the property "ingredients" of the right category.
        const category_to_update = await Category.findByIdAndUpdate(rightCategory._id, {
            $push : {
                ingredients : ing_to_update
            },
        },
        {new : true}
        ) 
        // 4 - we check if this ingredient is also part of another category. If yes, we delete it from the category identified 
        //==>  1 ingredient can only be in one category.   
        helpers.check_ingredients_in_categories(ingredientId, await category_to_update);

        console.log(`the new ingredient : ${ing_to_update}`)
        res.send("entry updated!");
    },

// D OF TH CRUD
    deletedObject : async(req, res) => {
        const ingredient_to_delete = req.body;
        // 1 - We delete the occurence of this ingredient in the property 'ingredients' for all the objects of the collection categories.
        recipe_helpers.clean_others_collection_arrays_after_deletion("ingredients",ingredient_to_delete._id, Category);
        //2 - We delete the ingredient.
        const entryToDelete = await Ingredient.findByIdAndRemove(ingredient_to_delete._id);
        res.send("entry removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

