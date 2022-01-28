const mongoose = require("mongoose");
const Categorie = require("../categories");

require('dotenv').config();


mongoose.connect(
    "mongodb://localhost:27017/impossible_pantry",
    {useNewUrlParser: true}, 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationCategorie = async() => {
    const clean = await Categorie.deleteMany({});

    const green = await Categorie.create({
        name : "Veggies & Fruits",
        ingredients : [],
        categoryPicture: "brocolli.png"
    })

    const dairy = await Categorie.create({
        name : "Dairy Products",
        ingredients : [],
        categoryPicture: "milk.png"
    })

    const meat = await Categorie.create({
        name : "Meat",
        ingredients : [],
        categoryPicture: "meat.png"
    })

    const spices = await Categorie.create({
        name : "Spices",
        ingredients : [],
        categoryPicture: "tabasco.png"
    })

    const beverage = await Categorie.create({
        name : "Beverage",
        ingredients : [],
        categoryPicture: "wine.png"
    })

    const carbs = await Categorie.create({
        name : "Carbs",
        ingredients : [],
        categoryPicture: "pasta.png"
    })

    const sweet = await Categorie.create({
        name : "Sweet",
        ingredients : [],
        categoryPicture: "candy.png"
    })
}

alimentationCategorie();

