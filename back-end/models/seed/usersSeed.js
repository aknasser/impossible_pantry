const mongoose = require("mongoose");
const User = require("../users");
const Recipe = require("../recipes");
const Ingredient = require("../ingredients");
mongoose.connect(
    "mongodb://localhost:27017/impossible_pantry",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationUser = async() => {
    const clean = await User.deleteMany({});
    const masterAdmin = await User.create({
        name : "Nasser",
        surname : "Massadimi",
        username : "nasser@nassmassa.com",
        recipesSaved : [],
        recipesSearched : [],
        recipesCooked : [],
        stock : [],
        
    })
};

alimentationUser();

