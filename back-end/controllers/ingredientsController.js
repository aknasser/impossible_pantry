const Ingredient = require("../models/ingredients");


module.exports = {


    testCookie : async(req, res) => {
        res.cookie("Hero", "Nass La Menace");
        res.send("Babyyyyyy");
    },

// (R OF THE CRUD)
    retrieveIngredient : async (req, res, next) => {
        const allIngredients = await Ingredient.find({});
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
        
        const newEntry = await Ingredient.create({
            name : newIngredient.name,
            price : newIngredient.price,
            scarcity : newIngredient.scarcity,
            fSSIndex : newIngredient.fSSIndex,
            category : newIngredient.category,
            
        })
        res.send("new entry created!");

    },

// U OF TH CRUD
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

// D OF TH CRUD
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

