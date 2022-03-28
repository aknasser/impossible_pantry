// REMOVE THE DELETED STYLE FROM THE poperrtySTYLE  OF THE RECIPE.
// ARG 1 : String - "the name of the property storing the recipes in the model" (for instance "category", "style") | ARG 2 : ID of the object to delete |ARG 3 : model of the object being deleted | ARG 4 : The model to check(for ex: Recipe, User...etc,) | ARG 5 : String - Name of the dummy object that will store the object without category / Style defined
// RETURN ==> Nada

const clean_entries_in_others_collections_after_deletion = async(property_to_update, object_to_delete_id, model_of_object_to_delete, model_collection_to_check, dummy_object_name) => {
    // 1 - We get all the entries of the given collection.
    const all_objects_from_the_collection = await model_collection_to_check.find({});
    // 2 - For each object, we check the property to update because of the deletion
    for (let object of all_objects_from_the_collection) {
                // 3 - If we find that the object we are deleting exist in an objects of this other collection...
                if (object[property_to_update].toString() === object_to_delete_id.toString()) {
                    console.log("heyo it's me");
                    // 4 - we define the garbage category / style as the property of this object.
                    const updated_object = await model_collection_to_check.findByIdAndUpdate(object._id, {
                        $set : {
                            [property_to_update] : await model_of_object_to_delete.findOne({name : dummy_object_name}),
                        },
                    },
                    {new : true}
                    ) 
                }
    };
};

module.exports = {clean_entries_in_others_collections_after_deletion};