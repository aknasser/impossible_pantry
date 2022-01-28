const Recipe = require("../models/recipes");


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


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

