const mongoose = require("mongoose");
const Ingredient = require("../ingredients");
const Recipe = require("../recipes")


mongoose.connect(
    "mongodb://localhost:27017/impossible_pantry",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationRecipe = async() => {
    const clean = await Recipe.deleteMany({});
    const allIngredients = await Ingredient.find({});

// VEGGIE SAUTE
    const veggieSaute = await Recipe.create({
        name : "Veggies Saute",
        steps : "Blablablba",
        country: "France",
        style : "Healthy",
        difficulty : 1,
        pictureUrl : "poele.png",
        mainIngredient : await Ingredient.findOne({ name : "mushroom"}),
        ingredientsNeeded : [
            {
                ingredient : await Ingredient.findOne({ name : "courgette"}),
                quantity : 1/2,
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "red pepper"}),
                quantity : 1/2,
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "mushroom"}),
                quantity : 100,
                unit : "g"
            },
            {
                ingredient : await Ingredient.findOne({ name : "eggs"}),
                quantity : "3",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "salt"}),
                quantity : "1",
                unit : "tea spoon "
            },
        ]

    })

// BOLOGNESE SPAGHETTIS
    const bologneseSpaghettis = await Recipe.create({
        name : "Bolognese Spaghettis",
        steps : "Blablablba",
        country: "Italy",
        style : "Yummy",
        difficulty : 1,
        pictureUrl : "bolognese.png",
        mainIngredient : await Ingredient.findOne({ name : "tomato pulp"}),
        ingredientsNeeded : [
            {
                ingredient : await Ingredient.findOne({ name : "tomato pulp"}),
                quantity : 400,
                unit : "g"
            },
            {
                ingredient : await Ingredient.findOne({ name : "spaghettis"}),
                quantity : 300,
                unit : "g"
            },
            {
                ingredient : await Ingredient.findOne({ name : "garlic"}),
                quantity : 5,
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "olive oil"}),
                quantity : "",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "onion"}),
                quantity : "2",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "carrot"}),
                quantity : "2",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "basil"}),
                quantity : "",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "oregan"}),
                quantity : "",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "salt"}),
                quantity : "",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "black pepper"}),
                quantity : "",
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "sugar"}),
                quantity : "",
                unit : ""
            },
        ]

    })


// LEMON BISCUIT
    const lemonBiscuit = await Recipe.create({
        name : "Lemon Biscuit",
        steps : "Blablablba",
        country: "Ireland",
        style : "Sweet",
        difficulty : 1.5,
        pictureUrl : "biscuits.png",
        mainIngredient : await Ingredient.findOne({ name : "lemon juice"}),
        ingredientsNeeded : [
            {
                ingredient : await Ingredient.findOne({ name : "lemon juice"}),
                quantity : 10,
                unit : "table spoon"
            },
            {
                ingredient : await Ingredient.findOne({ name : "eggs"}),
                quantity : 1,
                unit : ""
            },
            {
                ingredient : await Ingredient.findOne({ name : "flour"}),
                quantity : 425,
                unit : "g"
            },
            {
                ingredient : await Ingredient.findOne({ name : "sugar"}),
                quantity : "200",
                unit : "g"
            },
            {
                ingredient : await Ingredient.findOne({ name : "butter"}),
                quantity : "150",
                unit : "g"
            },
        ]

    })



}

alimentationRecipe();

