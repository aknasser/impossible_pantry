const mongoose = require("mongoose");
const Ingredient = require("../ingredients");
const Recipe = require("../recipes")
const Style = require("../styles");

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
        intro : "It doesn't look like much but these veggies will save your life. Literraly!",
        steps : ["Wash the veggies with clean water", "cut the carrots, and courgettes in small dices", "throw them in a frying pan with a bit of vegetal oil (medium fire)"],
        country: "France",
        style : await Style.findOne({ name : "Healthy"}),
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
                quantity : "",
                unit : ""
            },
        ]

    })

// BOLOGNESE SPAGHETTIS
    const bologneseSpaghettis = await Recipe.create({
        name : "Bolognese Spaghettis",
        intro : "An all-time classic, easy to cook but hard to master! Can you cook them like la mama ?",
        steps : ["Mix the meat with a bit of pepper and salt. Mix it thorougly. Let it rest", "put a saucing pan full of water on the stove", "while the water is boiling, cut onions in thin piece, carrots in dice and crush the garlic"],
        country: "Italy",
        style : await Style.findOne({ name : "Yummy"}),
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
        intro : "A sweet lemon cookie. Even better with a warm tea and a good movie!",
        steps : ["Melt the butter in the microwave (30 sec is enough)", "mix the melted butter with the brown sugar", "once you get a fluid mixture, add the lemon juice"],
        country: "Ireland",
        style : await Style.findOne({ name : "Sweet"}),
        difficulty : 1.5,
        pictureUrl : "biscuits.png",
        mainIngredient : await Ingredient.findOne({ name : "lemon juice"}),
        ingredientsNeeded : [
            {
                ingredient : await Ingredient.findOne({ name : "lemon juice"}),
                quantity : 0.10,
                unit : "l"
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

