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
        categoryPicture: "brocolli.png",
        description : "Add some color to your dishes with these beautiful veggies"
    })

    const dairy = await Categorie.create({
        name : "Dairy Products",
        ingredients : [],
        categoryPicture: "milk.png",
        description: "Cheese is good, cheese is life. Dairy products will drive your crazy!"
    })

    const meat = await Categorie.create({
        name : "Meat",
        ingredients : [],
        categoryPicture: "meat.png",
        description: "A good bloody steak or a fresh fish."

    })

    const spices = await Categorie.create({
        name : "Spices",
        ingredients : [],
        categoryPicture: "tabasco.png",
        description: "Add a bit of nitro to your mild dishes baby!"

    })

    const beverage = await Categorie.create({
        name : "Beverage",
        ingredients : [],
        categoryPicture: "wine.png",
        description: "Because drinking is important as well"

    })

    const carbs = await Categorie.create({
        name : "Carbs",
        ingredients : [],
        categoryPicture: "pasta.png",
        description: "Get these pastas and be a champ."

    })

    const sweet = await Categorie.create({
        name : "Sweet",
        ingredients : [],
        categoryPicture: "candy.png",
        description: "Because life needs to be sweet (sometimes)."

    })
}

alimentationCategorie();

