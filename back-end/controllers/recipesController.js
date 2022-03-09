const Recipe = require("../models/recipes");
const User = require("../models/users");

module.exports = {



    retrieveRecipe : async (req, res, next) => {
        const allRecipe = await Recipe.find({}).sort({createdAt : -1});
        res.locals.toConvert = allRecipe;   // On cale allRecipe dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     
    selectedRecipe : async(req, res, next) => {
        const idRecipe = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenRecipe = await Recipe.findById(idRecipe)
        res.locals.toConvert = chosenRecipe;
        next();
    },

    newRecipe : async(req, res) => {
        const newRecipe = req.body;
        console.log(`le titre de la citation : ${newRecipe.quote}`)
        
        const newEntry = await Recipe.create({
            name : newRecipe.quote,
            steps : newRecipe.author,
            country : newRecipe.country,
            style : newRecipe.style,
            difficulty : newRecipe.difficulty,
            pictureUrl : newRecipe.pictureUrl,
            mainIngredient : newRecipe.mainIngredient,
            ingredientsNeeded : newRecipe.ingredientsNeeded,
        })
        res.send("new entry created!");

    },

    updatedRecipe : async(req, res) => {
        let recipeUpdated = req.body
        console.log(`L'auteur de la citation updaté : ${RecipeUpdated.author}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Recipe.findByIdAndUpdate(objectId, {
            $set : {
                name : recipeUpdated.quote,
                steps : recipeUpdated.author,
                country : recipeUpdated.country,
                style : recipeUpdated.style,
                difficulty : recipeUpdated.difficulty,
                pictureUrl : recipeUpdated.pictureUrl,
                mainIngredient : recipeUpdated.mainIngredient,
                ingredientsNeeded : recipeUpdated.ingredientsNeeded,
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
        const entryToDelete = await Recipe.findByIdAndRemove(targetId);
        res.send("entry removed!");
    },

    matchingRecipe : async(req, res) => {
    // 1 - GET THE USER STOCK
        // a - we collect the userId using the params
        const userId = req.params.userId;

        const currentUser = await User.findById(userId);
        const userStock = await currentUser.stock;
        // b - Create a hash Table with user.stock

        let stockHashTable = {};

        for (let food of userStock) {
            // To get the Id of the ingredient
            const foodId = food.ingredient; 
            stockHashTable[foodId] =  {
                quantity : food.quantity
            };
        }
        // --CHECKED - Should be a collection of objectID (ingredients collection)
    
    // 2 - CHECK WHICH RECIPE MATCH THE USERSTOCK
        // a -  For each recipe check if their property "ingredientNeeded" is contained in the hashTable created with user.stock
        // Here we populate style and mainIngredient to display them in the client interface
        const allRecipes = await Recipe.find({}).populate("style mainIngredient");

        // These array will be populated later with the corresponding recipe : perfectMatchRecipes : the user has all the ingredient needed in his stock | almostRecipes : the user has everything except 1 ingredient | complexRecipe : The user is missing 2 ingredients.
        let perfectMatchRecipes = {
            title : "Perfect Match",
            recipes : []
        } ;
        let almostRecipes = {
            title : "Almost...only 1 ingredient missing",
            recipes : []
        };
        let complexRecipes = {
            title : "A bit of a stretch",
            recipes : []
        };

        for (let recipe of allRecipes) {
            // b -  To do so, we create a variable  let missingIngredinent = 0
            let missingIngredient = 0;
            for (let foodNeeded of recipe.ingredientsNeeded) {
                // c - everytime, an ingredient is absent from the hashtable OR the quantity available is lower than the quantity needed  ==> missingingredient++ (it increases by 1).
                if (!stockHashTable[foodNeeded.ingredient] || stockHashTable[foodNeeded.ingredient].quantity < foodNeeded.quantity) {
                    missingIngredient++ ;
                }
            }

            /* d - at the end of the loop for is over, we check the variable missingIngredient with a switch.
            if missingIngredient = 0 we push the recipe in the object perfectMatch | = 1 in the object almost | = 2 a stretch */        
            switch (missingIngredient) {
                case 0 :
                    perfectMatchRecipes.recipes.push(recipe);
                    /* console.log(`PerfectMatch for : ${recipe.name}`) */
                    break;
                
                case 1 : 
                    almostRecipes.recipes.push(recipe);
                    /* console.log(`Great match for : ${recipe.name} (1 ingredient Missing)`) */
                    break;

                case 2 : 
                    complexRecipes.recipes.push(recipe);
                    /* console.log(`Complex match for : ${recipe.name} (2 ingredients Missing)`) */
                    break;

                default:
                    break;
            }
        }
        // e - We send these 3 objects in the response (we store these 3 objects in one array).
        res.send(recipeAvailable = {perfectMatchRecipes, almostRecipes, complexRecipes})
    },

// TO PROVIDE THE INFORMATION NEEDED BY THE COMPONENT RECIPEDETAILS IN THE FRONT-END
// We want to get 2 random recipes !== from the chosen recipe.
// These recipes will be displayed in the front-end as suggestions at the bottom of the page (component RecipeDetails.jsx in the Front-end)
    recipeDetails : async (req, res) => {
        // 1 - Get the recipe chosen Id. We need it to check whether the suggestion is DIFFEREENT from$ the recipeChosen by the user.
        const recipeChosenId = req.params.recipeId;
        // This array will contains the suggestions.
        const suggestions = []; 
        const nmbrOfSuggestions = 2;

        // We will use this hashTable to check if an ingredient is already part of the array suggestions, if yes we will skip it(we don't want duplicate).
        const suggestionsHashTable = {};

        const allRecipes = await Recipe.find({});
        // 2 - Get Two random recipe !== recipe. If recipeSuggestion._id[i] = recipeChosenId, we look for another recipe.  
            
        // As long as we have less than nmbrOfSuggestions (here 2), we keep looping.
        while (suggestions.length < nmbrOfSuggestions) {
            // a - Create a random number
            const randomNumber = Math.floor(Math.random() * allRecipes.length );  

            // b - get a random element of the array allRecipes using the randomNumber
            const randomRecipe = allRecipes[randomNumber];

            // c - Check if the random recipe is different from the recipeChosenID. If yes, we push it in the array suggestions
            // (we use a simple inequality here (!= because they randomRecipe._id and recipeChosenId are not supposed to exactly IDENTICAL))
            if (randomRecipe._id != recipeChosenId && !suggestionsHashTable[randomRecipe._id] ) {
                console.log(` randomRecipe :${randomRecipe._id}`);
                console.log(` recipeChosenId :${recipeChosenId}`);
                suggestions.push(randomRecipe);
                // we add this recipe to the hashTable, suggestionsHashTable
                suggestionsHashTable[randomRecipe._id] = true;
            } else if (suggestionsHashTable[randomRecipe._id]) {
                console.log("DUPLICATE INCOMING");
            }
        }
        // d - once suggestions.length === nmbrOfSuggestions the while loop is completed.
        for (meal of suggestions) {
            console.log(`Suggestions : ${meal.name}`);
        }

        // 3 - The response (an array) 
        res.send(suggestions); 
    },

    filteredRecipes : async (req, res) => {
        // 1 - retrieve the filter from the POST REQUEST
        const filter = req.body.filters;
        console.log (filter);

        // 2 - Encapsule THE Sub-filters in variables to make things cleared
        const countryFilter = filter.country;
        const styleFilter = filter.style;
        const difficultyFilter = filter.difficulty;
        const ingredientsFilter = filter.ingredients;
        
        // 3 - We create empty Hash Tables for each subFilter. 
        // We will use these hash table later on to check if the recipe match with this filter
        let countryHt = {};
        let styleHt = {};
        let difficultyHt = {};
        let ingredientsHt = {};


        // 4 - This function will populate the hash tables above with key / value.
        //  With this process, the element of the subFilter are included in the corresponding hash table as key
        //  For example, let's say that "France" is an element of the filter countryFilter
        //  using this function France will become a key of the countryHt and will get countryHt = {France = true};
        //  This will help us to identify the matchingRecipes later.
        const populateFilterHashTable = (subFilter, hashTable) => {
            for (let element of subFilter) {
                hashTable[element] = true; 
            }
            return hashTable;
        };

        // 5 -  we execute populateFilterHashTable to populate the hash Table
        countryHt = populateFilterHashTable(countryFilter, countryHt);
        styleHt = populateFilterHashTable(styleFilter, styleHt);
        difficultyHt = populateFilterHashTable(difficultyFilter, difficultyHt);
        ingredientsHt = populateFilterHashTable(ingredientsFilter, ingredientsHt);


        // 6 - We get all the Recipes.
        // We need to populate style to have access to its property "name" (we will use it to check the styleHt)
        // Likewise, we need to populate ingredient (which is inside ingredientsNeeded) to access the property name of each ingredient. 
        const allRecipes = await Recipe.find({})
            .populate(
                {
                    path : "ingredientsNeeded",
                    populate : 
                        {
                            path : "ingredient",
                            model : "Ingredient"
                        }
                }
            )
            .populate(
                "style"
            ); 


        // 7 - This function filters an array for a given filter (style, countries, ingredients, difficulty). It accepts 3 arguments: 
            // arrayToFilter : this array contains the recipe to filter. At first allRecipes is the arrayToFilte
            // correspondingHashTable : the hash Table associated to the property to Check.
            // propertyToCheck : a string. Tell us what we are filtering, could be "style", "country", "ingredient", "difficulty" 
        const filteringRecipes = (arrayToFilter, correspondingHashTable, propertyToCheck) => {

            // this array lists all the key in the correspondingHashTable. If this array is empty (length = 0), there is no filter to use (see a2 below). We return the array to Filter unaltered.
            let hashTableKeyList = Object.keys(correspondingHashTable);

            // Two conditions to start the filter : 
            // a1 - if arrayToFilter has at least one property, we have something to filter. Otherwise, it means that arrayToFilter is empty and we can return arrayFiltered as an empty array(it's the same).
            // a2 - if correspondingHashTable is not empty  then there is at least one filter to apply. Otherwise, we return arrayFilter without any modifications
            if (arrayToFilter.length > 0 && hashTableKeyList.length > 0) {
                // b - this array will contains the value matching with the filter
                const arrayFiltered = [];
                // c -  We loop into the recipes in arrayToFilter...
                for (let recipeToCheck of arrayToFilter) {
                    // c1 - valueToCheck encapsulate the value to look up in the corresponding hashTable.
                    // For example if the property to check is "style" and the recipes "Veggies Saute", valueToCheck = "Healthy" (the name of the property style for Veggie Saute).
                    // Why we use A SWITCH STATEMENT ? Depending on the value of propertyToCheck we will check different level of the object.For instance country is easy to access (recipe.country) but for style we need to go deeper (recipe.style.name)                   
                    let valueToCheck;
                    switch (propertyToCheck) {
                        case "style":
                            valueToCheck = recipeToCheck[propertyToCheck].name;
                            break;

                        case "country":
                            valueToCheck = recipeToCheck[propertyToCheck];
                            break;

                        case "difficulty":
                            valueToCheck = recipeToCheck[propertyToCheck];
                            break;
                            
                        default:
                            break;
                    }
                    console.log("VALUE TO CHECK : " + valueToCheck);

                    // d - We check whether this value is a key of the corresponding hash Table, if yes we add this recipe to the arrayFiltered. 
                    if (correspondingHashTable[valueToCheck]) {
                        arrayFiltered.push(recipeToCheck);
                    }
                };
            // e1 - Finally, we return the arrayFiltered. The array filtered will then be used as arrayToFilter for the next filter and so on.
            // e2 - If arrayToFilter is empty ([]), arrayFiltered is also empty([]). 
                return arrayFiltered;
            }
            return arrayToFilter;
        };

        // 8 - Ingredient is a lil bit special. We create a specific function to check if a recipe pass the ingredient Filter test.
        // This function follow the same logic as filteringRecipes
        const filteringRecipesByIngredients = (arrayToFilter, correspondingHashTable) => {
            let hashTableKeyList = Object.keys(correspondingHashTable);
            if (arrayToFilter.length > 0 && hashTableKeyList.length > 0) {
                const arrayFiltered = [];
                for (let recipeToCheck of arrayToFilter) {
        
                    for (let ingredientSpecs of recipeToCheck.ingredientsNeeded) {
                        let ingredientToCheck = ingredientSpecs.ingredient.name;
                        console.log(`INGREDIENT TO CHECK : ${ingredientToCheck}`);
                        if (correspondingHashTable[ingredientToCheck]) {
                            arrayFiltered.push(recipeToCheck);
                            break;
                        }
                    }
                };
                return arrayFiltered;
            }
            return arrayToFilter;
        };

        // 9 - Carry out the succesful filters :  First we clean the list with the style filters... then we clean the remaining recipes with the country filters...and so on...
        let styleCleaner = await filteringRecipes(allRecipes, styleHt, "style");
        let countryCleaner = await filteringRecipes(styleCleaner, countryHt, "country");
        let difficultyCleaner = await filteringRecipes(countryCleaner, difficultyHt, "difficulty");
        let ingredientCleaner = await filteringRecipesByIngredients(difficultyCleaner, ingredientsHt); 


        // START - CHECK FILTER 
        const resultsChecker = (array, filterName) => {
            if (array.length <= 0) {
                console.log (`NO MATCHING RECIPES WITH ${filterName}`);
            } else {
                for (let recipe of array) {
                    console.log(`AFTER ${filterName} CLEANING : ${recipe.name}`);
                }
            }
        };
        const styleFilterChecker = resultsChecker(styleCleaner, "STYLE");
        const countriesFilterChecker = resultsChecker(countryCleaner, "COUNTRIES");
        const difficultyFilterChecker = resultsChecker(difficultyCleaner, "DIFFICULTY"); 
        const ingredientFilterChecker = resultsChecker(ingredientCleaner, "INGREDIENT");

        // END - CHECK FILTER 


        // 10 - send the filtered recipes to the client
        // We send the result of the last filter (aka ingredientCleaner in this context).
        const filteredRecipes = ingredientCleaner;
        console.log(`filteredRecipes from the BE: ${filteredRecipes}`);
        res.send(filteredRecipes);
    },


    searchedKeywords : async(req, res) => {
        // 1 - get the keyword typed by the user
        const keywords = req.params.keywords;
        console.log(`Keywords : ${keywords}`);

        // 2 - look for the recipes containing this keyword
        const recipesKeywords = await Recipe.find({ name : 
            {
            "$regex" : keywords,
            "$options" : "i"  
            }
        });

        // REMINDER : REGEX SYNTAX
        // property - The property we want to explore (could be name, content, whatever)
        // "$regex" : variable - the variable to look for in the property
        // "$options" : i : means that we don't care about the case. Check the MongoDB link(in the title of this section) to find out others options

        console.log(`recipes found : ${recipesKeywords}`);

        // 3 - send this object to the user
        res.send(recipesKeywords);
    },


    
    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);

    } 

};

