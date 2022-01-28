const mongoose = require("mongoose");
const Ingredient = require("../ingredients");
const Categorie = require("../categories");

mongoose.connect(
    "mongodb://localhost:27017/impossible_pantry",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES

//These arrays will contains the ingredients. Once created, the ingredients will be pushed in the corresponding category.
const ingVeggie = [];
const ingDairy = [];
const ingMeat = [];
const ingSpice = [];
const ingBeverage = [];
const ingCarbs = [];
const ingSweet = [];


const alimentationIngredient = async() => {
    const clean = await Ingredient.deleteMany({});
    

// All the categories
    const veggie = await Categorie.findOne({ name : "Veggies & Fruits" })
    const dairy = await Categorie.findOne({ name : "Dairy Products" })
    const meat = await Categorie.findOne({ name : "Meat" })
    const spices = await Categorie.findOne({ name : "Spices" })
    const beverage = await Categorie.findOne({ name : "Beverage" })
    const carbs = await Categorie.findOne({ name : "Carbs" })
    const sweet = await Categorie.findOne({ name : "Sweet" })


//1 -  START - Creation ingredients
    const ingredientsCreation = async() => {

    //VEGGIE
        const courgette = await Ingredient.create({
            name : "Courgette",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })

        const redPepper = await Ingredient.create({
            name : "Red Pepper",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })

        const mushroom = await Ingredient.create({
            name : "Mushroom",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })


        const garlic = await Ingredient.create({
            name : "Garlic",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })

        const tomatoPulp = await Ingredient.create({
            name : "Tomato Pulp",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })


        const carrot = await Ingredient.create({
            name : "Carrot",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })

        const onion = await Ingredient.create({
            name : "Onion",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })

        const lemonJuice = await Ingredient.create({
            name : "Lemon Juice",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : veggie
        })

    // DAIRY PRODUCTS
        const butter = await Ingredient.create({
            name : "Butter",
            price : 1,
            scarcity : 1,
            fSSIndex: 3,
            category : dairy
        })

        const liquidCream = await Ingredient.create({
            name : "Liquid Cream",
            price : 1,
            scarcity : 1,
            fSSIndex: 2,
            category : dairy
        })

        const freshCream = await Ingredient.create({
            name : "Fresh Cream",
            price : 1,
            scarcity : 1,
            fSSIndex: 3,
            category : dairy
        })

    // MEAT
        const egg = await Ingredient.create({
            name : "Eggs",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : meat
        })

        const mincedMeat = await Ingredient.create({
            name : "Minced Meat",
            price : 1,
            scarcity : 1,
            fSSIndex: 2,
            category : meat
        })
    
    //SPICE

        const salt = await Ingredient.create({
            name : "Salt",
            price : 1,
            scarcity : 1,
            fSSIndex: 3,
            category : spices
        })

        const blackPepper = await Ingredient.create({
            name : "Black Pepper",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : spices
        })


        const basil = await Ingredient.create({
            name : "Basil",
            price : 1,
            scarcity : 1,
            fSSIndex: 1,
            category : spices
        })


        const oregan = await Ingredient.create({
            name : "Oregan",
            price : 2,
            scarcity : 1,
            fSSIndex: 1,
            category : spices
        })


        const oliveOil = await Ingredient.create({
            name : "Olive Oil",
            price : 3,
            scarcity : 1,
            fSSIndex: 3,
            category : spices
        })

    // BEVERAGE
        const redWine = await Ingredient.create({
            name : "Red Wine",
            price : 3,
            scarcity : 2,
            fSSIndex: 3,
            category : beverage
        })
    //CARBS
    const spaghettis = await Ingredient.create({
        name : "Spaghettis",
        price : 1,
        scarcity : 1,
        fSSIndex: 2,
        category : carbs
    })

    const flour = await Ingredient.create({
        name : "Flour",
        price : 1,
        scarcity : 1,
        fSSIndex: 1,
        category : carbs
    })

    const rice = await Ingredient.create({
        name : "Rice",
        price : 1,
        scarcity : 1,
        fSSIndex: 1,
        category : carbs
    })

    //SWEET

    const sugar = await Ingredient.create({
        name : "Sugar",
        price : 1,
        scarcity : 1,
        fSSIndex: 3,
        category : sweet
    })
// END - Creation ingredients


    // 2 - PUSH IN THE RIGHT ARRAY
    ingVeggie.push(courgette, redPepper, mushroom, garlic, tomatoPulp, carrot, onion, lemonJuice);
    ingDairy.push(butter, liquidCream, freshCream);
    ingMeat.push(egg, mincedMeat);
    ingSpice.push(salt, blackPepper, basil, oregan, oliveOil);
    ingBeverage.push(redWine);
    ingCarbs.push(spaghettis, flour, rice);
    ingSweet.push(sugar);

    }

    await ingredientsCreation(); // We wait for ingredientsCreation before moving on with the Categoryfill


// 3 - START - FILL CATEGORIES ==> To update the categories with the new ingredients
    const fillCategories = async() => {
        const updatedVeggie = await Categorie.findOneAndUpdate({ name : "Veggies & Fruits" }, {
            $set : 
                {
                    ingredients : ingVeggie
                }
            },
            {new : true}
        )
        const updatedDairy = await Categorie.findOneAndUpdate({ name : "Dairy Products" }, {
            $set : 
                {
                    ingredients : ingDairy
                }
            },
            {new : true}
        )

        const updatedMeat = await Categorie.findOneAndUpdate({ name : "Meat" }, {
            $set : 
                {
                    ingredients : ingMeat
                }
            },
            {new : true}
        )

        const updatedSpice = await Categorie.findOneAndUpdate({ name : "Spices" }, {
            $set : 
                {
                    ingredients : ingSpice
                }
            },
            {new : true}
        )

        const updatedBeverage = await Categorie.findOneAndUpdate({ name : "Beverage" }, {
            $set : 
                {
                    ingredients : ingBeverage
                }
            },
            {new : true}
        )

        const updatedCarbs = await Categorie.findOneAndUpdate({ name : "Carbs" }, {
            $set : 
                {
                    ingredients : ingCarbs
                }
            },
            {new : true}
        )

        const updatedSweet = await Categorie.findOneAndUpdate({ name : "Sweet" }, {
            $set : 
                {
                    ingredients : ingSweet
                }
            },
            {new : true}
        )



    }
    
    await fillCategories();
    // 2 - END - FILL CATEGORIES

}

alimentationIngredient();

/* FINAL RESULTS :
 1 - New ingredients.
 2 - They have a defined categories.
 3 - The categories previously created have been updated with these ingredients.
*/
