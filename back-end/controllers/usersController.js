const User = require("../models/users");
const Ingredient = require("../models/ingredients");
const { findOne } = require("../models/users");

module.exports = {



    retrieveUser : async (req, res, next) => {
        const allUser = await User.find({}).sort({createdAt : -1});
        res.locals.toConvert = allUser;   // On cale allUser dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     

    selectedUser : async(req, res, next) => {
        const idUser = req.params.id;                     
        
        // We use populate() to have access  tot the property of "ingredient" within the property "stock" 
        const chosenUser = await User.findById(idUser).populate({
            path : "stock",
            populate : {
                path : "ingredient",
                model : "Ingredient"
            }
        })
        res.locals.toConvert = chosenUser;
        next();
    },

    newUser : async(req, res) => {
        const newUser = req.body;
        console.log(`le titre de la citation : ${newUser.quote}`)
        
        const newEntry = await User.create({
            name : newUser.name,
            surname : newUser.surname,
            username : newUser.username,
            recipesSaved : newUser.recipesSaved,
            recipesSearched : newUser.recipesSearched,
            recipesCooked : newUser.recipesCooked,
            stock : newUser.stock
        })
        res.send("new entry created!");

    },

    updatedUser : async(req, res) => {
        let userUpdated = req.body
        console.log(`The user to be updated : ${userUpdated.name}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await User.findByIdAndUpdate(objectId, {
            $set : {
                name : userUpdated.name,
                surname : userUpdated.surname,
                username : userUpdated.username,
                recipesSaved : userUpdated.recipesSaved,
                recipesSearched : userUpdated.recipesSearched,
                recipesCooked : userUpdated.recipesCooked,
                stock : userUpdated.stock
            },
        },
        {new : true}
        )
        console.log(`la nouvelle entrée : ${entryToUpdate}`)
        res.send("entry updated!");

    },

    updateStock : async(req, res) => {
        let newStock = [];
        let userId = req.params.id;
        let foodSubmitted = req.body;  // The hash table we have created using ingredient submitted by the user in the front-end.
/*         console.log (`the stock updated : ${JSON.stringify(foodSubmitted)}`); */

        // 1 - We add each ingredient collected from the request in the array newStock

        // a - We loop iterates over all the properties of the object foodSubmitted with FOR...IN.
        for (let key in foodSubmitted) {
            const food = foodSubmitted[key]; // We use [key] instead of .key because we want to use the VALUE/STRING encapsulated in the variable key. If we use .key, the server will look for the property key (which doesn't exist).   
            // a - Look for the ingredient corresponding in the DB
            const foodId = await Ingredient.findOne({ name : food.ingredient.name });
            // b - we create an object to contains ingredient and the quantity available (the quantity is part of the food object created by the user while submitting the form). 
            const newIngredient = await {
                ingredient : foodId,
                quantity : food.quantity,
            } ;            
            // c - we push this new object in the object newStock
            newStock.push(newIngredient); 

        };

/*         console.log(`NEW STOCK ARRAY : ${JSON.stringify(newStock)}`); */

        // 2 - We update user.stock with newStock
        const userToUpdate = await User.findByIdAndUpdate(userId, {
            $set : {
                stock : newStock
            },
        },
        {new : true}
        )
        // 3 - We send a response to the client. Thanks to this response, the client know that the update has been done he can move on with the rest of the code (redirection towards the results page).
        res.send("Stock has been updated sucessfully!");
    },

    deletedObject : async(req, res) => {
        const targetId = req.params.id;
        console.log(`ID de l'élément à supprimer : ${targetId}`);
        const entryToDelete = await User.findByIdAndRemove(targetId);
        res.send("entry removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);


    } 
 
};

