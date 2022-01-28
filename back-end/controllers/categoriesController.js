const Category = require("../models/categories");


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
        console.log(`le titre de la citation : ${newCategory.quote}`)
        
        const newEntry = await Category.create({
            name : newCategory.name,
            ingredients : newCategory.ingredients,
            categoryPicture : newCategory.categoryPicture,
        })
        res.send("new entry created!");

    },

    updatedCategory : async(req, res) => {
        let categoryUpdated = req.body
        console.log(`L'auteur de la citation updaté : ${categoryUpdated.author}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Category.findByIdAndUpdate(objectId, {
            $set : {
                name : categoryUpdated.name,
                ingredients : categoryUpdated.ingredients,
                categoryPicture : categoryUpdated.categoryPicture,
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
        const entryToDelete = await Category.findByIdAndRemove(targetId);
        res.send("entry removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

