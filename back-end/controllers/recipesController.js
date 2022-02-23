const Recipe = require("../models/recipes");
const User = require("../models/users");

module.exports = {



    retrieveRecipe : async (req, res, next) => {
        const allRecipe = await Recipe.find({}).sort({createdAt : -1});
        res.locals.toConvert = allRecipe;   // On cale allRecipe dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     
    selectedRecipe : async(req, res, next) => {
        const idRecipe = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenRecipe = await Recipe.findById(idRecipe)
        res.locals.toConvert = chosenRecipe;
        next();
    },

    newRecipe : async(req, res) => {
        const newRecipe = req.body;
        console.log(`le titre de la citation : ${newRecipe.quote}`)
        
        const newEntry = await Recipe.create({
            name : newRecipe.quote,
            steps : newRecipe.author,
            country : newRecipe.country,
            style : newRecipe.style,
            difficulty : newRecipe.difficulty,
            pictureUrl : newRecipe.pictureUrl,
            mainIngredient : newRecipe.mainIngredient,
            ingredientsNeeded : newRecipe.ingredientsNeeded,
        })
        res.send("new entry created!");

    },

    updatedRecipe : async(req, res) => {
        let recipeUpdated = req.body
        console.log(`L'auteur de la citation updaté : ${RecipeUpdated.author}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Recipe.findByIdAndUpdate(objectId, {
            $set : {
                name : recipeUpdated.quote,
                steps : recipeUpdated.author,
                country : recipeUpdated.country,
                style : recipeUpdated.style,
                difficulty : recipeUpdated.difficulty,
                pictureUrl : recipeUpdated.pictureUrl,
                mainIngredient : recipeUpdated.mainIngredient,
                ingredientsNeeded : recipeUpdated.ingredientsNeeded,
            },
        },
        {new : true}
        )
        console.log(`la nouvelle entrée : ${entryToUpdate}`)
        res.send("entry updated!");

    },

    deletedObject : async(req, res) => {
        const targetId = req.params.id;
        console.log(`ID de l'élément à supprimer : ${targetId}`);
        const entryToDelete = await Recipe.findByIdAndRemove(targetId);
        res.send("entry removed!");
    },

    matchingRecipe : async(req, res) => {
    // 1 - GET THE USER STOCK
        // a - we collect the userId using the params
        const userId = req.params.userId;

        const currentUser = await User.findById(userId);
        const userStock = await currentUser.stock;
        // b - Create a hash Table with user.stock

        console.log(`check USERSTOCK : ${userStock}`);
        let stockHashTable = {};

        for (let food of userStock) {
            // To get the Id of the ingredient
            const foodId = food.ingredient; 
            stockHashTable[foodId] =  {
                quantity : food.quantity
            };
        }
        // --CHECKED - Should be a collection of objectID (ingredients collection)
    
    // 2 - CHECK WHICH RECIPE MATCH THE USERSTOCK
        // a -  For each recipe check if their property "ingredientNeeded" is contained in the hashTable created with user.stock
        // Here we populate style and mainIngredient to display them in the client interface
        const allRecipes = await Recipe.find({}).populate("style mainIngredient");

        console.log(`All the recipes: ${allRecipes}`)
        // These array will be populated later with the corresponding recipe : perfectMatchRecipes : the user has all the ingredient needed in his stock | almostRecipes : the user has everything except 1 ingredient | complexRecipe : The user is missing 2 ingredients.
        let perfectMatchRecipes = {
            title : "Perfect Match",
            recipes : []
        } ;
        let almostRecipes = {
            title : "Almost...only 1 ingredient missing",
            recipes : []
        };
        let complexRecipes = {
            title : "A bit of a stretch",
            recipes : []
        };

        for (let recipe of allRecipes) {
            // b -  To do so, we create a variable  let missingIngredinent = 0
            let missingIngredient = 0;
            for (let foodNeeded of recipe.ingredientsNeeded) {
                // c - everytime, an ingredient is absent from the hashtable OR the quantity available is lower than the quantity needed  ==> missingingredient++ (it increases by 1).
                if (!stockHashTable[foodNeeded.ingredient] || stockHashTable[foodNeeded.ingredient].quantity < foodNeeded.quantity) {
                    missingIngredient++ ;
                }
            }
            console.log(`missingIngredient for ${recipe.name} (after checking) = ${missingIngredient} `);

            /* d - at the end of the loop for is over, we check the variable missingIngredient with a switch.
            if missingIngredient = 0 we push the recipe in the object perfectMatch | = 1 in the object almost | = 2 a stretch */        
            switch (missingIngredient) {
                case 0 :
                    perfectMatchRecipes.recipes.push(recipe);
                    /* console.log(`PerfectMatch for : ${recipe.name}`) */
                    break;
                
                case 1 : 
                    almostRecipes.recipes.push(recipe);
                    /* console.log(`Great match for : ${recipe.name} (1 ingredient Missing)`) */
                    break;

                case 2 : 
                    complexRecipes.recipes.push(recipe);
                    /* console.log(`Complex match for : ${recipe.name} (2 ingredients Missing)`) */
                    break;

                default:
                    console.log(`Not enough ingredient for this recipe : ${recipe.name}`); 
                    break;
            }
        }
        // e - We send these 3 objects in the response (we store these 3 objects in one array).
        res.send(recipeAvailable = {perfectMatchRecipes, almostRecipes, complexRecipes})
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

