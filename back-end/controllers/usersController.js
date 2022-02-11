const User = require("../models/users");


module.exports = {



    retrieveUser : async (req, res, next) => {
        const allUser = await User.find({}).sort({createdAt : -1});
        res.locals.toConvert = allUser;   // On cale allUser dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     

    selectedUser : async(req, res, next) => {
        const idUser = req.params.id;                    // on récupère le paramètre de l'id appelé 
        
        // We use populate() to have access  tot the property of "ingredient" within the property "stock".
        const chosenUser = await User.findById(idUser).populate({
            path : "stock",
            populate : {
                path : "ingredient",
                model : "Ingredient"
            }
        })
        console.log(chosenUser);
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
        console.log(`L'auteur de la citation updaté : ${userUpdated.author}`);
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

