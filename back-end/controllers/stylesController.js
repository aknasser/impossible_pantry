const Style = require("../models/styles");
const Recipe = require("../models/recipes");
const helpers = require("./helpers_functions/styles_functions");



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
        console.log(`le titre de la citation : ${newStyle.name}`)
        
        const newEntry = await Style.create({
            name : newStyle.name,
            stylePicture : newStyle.stylePicture,
        })
        res.send("new entry created!");

    },

    updatedStyle : async(req, res) => {
        let styleUpdated = req.body
        console.log(`style to update : ${styleUpdated.name}`);
        console.log(`L'id: ${styleUpdated._id}`);

        const entryToUpdate = await Style.findByIdAndUpdate(styleUpdated._id, {
            $set : {
                name : styleUpdated.name,
                stylePicture : styleUpdated.stylePicture,
            },
        },
        {new : true}
        )
        console.log(`la nouvelle entrée : ${entryToUpdate}`)
        res.send("entry updated!");

    },

    deletedObject : async(req, res) => {
        console.log("ready to start the deletion process!");
        const object_to_delete_id = req.body._id;
        helpers.clean_entries_in_others_collections_after_deletion("style", object_to_delete_id, Style, Recipe, "No Style");
        const entryToDelete = await Style.findByIdAndRemove(object_to_delete_id);
        res.send("style removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

