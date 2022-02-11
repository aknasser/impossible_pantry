const Ingredient = require("../models/ingredients");


module.exports = {


    testCookie : async(req, res) => {
        res.cookie("Hero", "Nass La Menace");
        res.send("Babyyyyyy");
    },

// (R FROM THE CRUD)
    retrieveIngredient : async (req, res, next) => {
        const allIngredients = await Ingredient.find({});
        res.locals.toConvert = allIngredients;   
        next(); 
     },
     
//(R FROM THE CRUD - 1 ENTRY SELECTED)
    selectedIngredient : async(req, res, next) => {
        const idIngredient = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenIngredient = await Ingredient.findById(idIngredient)
        res.locals.toConvert = chosenIngredient;
        next();
    },

    newIngredient : async(req, res) => {
        const newIngredient = req.body;
        
        const newEntry = await Ingredient.create({
            name : newIngredient.name,
            price : newIngredient.price,
            scarcity : newIngredient.scarcity,
            fSSIndex : newIngredient.fSSIndex,
            category : newIngredient.category,
            
        })
        res.send("new entry created!");

    },

    updatedIngredient : async(req, res) => {
        let ingredientUpdated = req.body;
        console.log(`L'auteur de la citation updaté : ${ingredientUpdated.author}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Ingredient.findByIdAndUpdate(objectId, {
            $set : {
                name : ingredientUpdated.name,
                price : ingredientUpdated.price,
                scarcity : ingredientUpdated.scarcity,
                fSSIndex : ingredientUpdated.fSSIndex,
                category : ingredientUpdated.category,
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
        const entryToDelete = await Ingredient.findByIdAndRemove(targetId);
        res.send("entry removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

