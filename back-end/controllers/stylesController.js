const Style = require("../models/styles");


module.exports = {



    retrieveStyle : async (req, res, next) => {
        const allStyle = await Style.find({});
        res.locals.toConvert = allStyle;   // On cale allStyle dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     
    selectedStyle : async(req, res, next) => {
        const idStyle = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenStyle = await Style.findById(idStyle)
        res.locals.toConvert = chosenStyle;
        next();
    },

    newStyle : async(req, res) => {
        const newStyle = req.body;
        console.log(`le titre de la citation : ${newStyle.quote}`)
        
        const newEntry = await Style.create({
            name : newStyle.name,
            stylePicture : newStyle.stylePicture,
        })
        res.send("new entry created!");

    },

    updatedStyle : async(req, res) => {
        let categoryUpdated = req.body
        console.log(`L'auteur de la citation updaté : ${categoryUpdated.author}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Style.findByIdAndUpdate(objectId, {
            $set : {
                name : categoryUpdated.name,
                stylePicture : categoryUpdated.stylePicture,
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
        const entryToDelete = await Style.findByIdAndRemove(targetId);
        res.send("entry removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

