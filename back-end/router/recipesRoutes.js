const router = require("express").Router();
const recipesController = require("../controllers/recipesController");



// R DU CRUD
router.get("/",  recipesController.retrieveRecipe, recipesController.convertJSON);  
router.get("/id/:id", recipesController.selectedRecipe, recipesController.convertJSON);

// C DU CRUD
router.post("/create", recipesController.newRecipe);

//U DU CRUD
router.post("/update/:id", recipesController.updatedRecipe);

// D du CRUD
router.post("/delete/:id", recipesController.deletedObject);

// FETCH MATCHING RECIPES
router.get("/matchingrecipes/:userId", recipesController.matchingRecipe);

// FETCH 2 FEATURED RECIPES IN RECIPES DETAILS
router.get("/recipesdetails/:recipeId", recipesController.featuredRecipes);

// FETCH RECIPES CORRESPONDING TO THE FILTER IN SEARCH / I WANNA EAT (EXCEPT KEYWORKDS)
router.post("/filteredrecipes", recipesController.filteredRecipes)

// FETCH RECIPES CORRESPONDING TO THE KEYWORDS TYPED BY THE USER
router.get("/search/:keywords", recipesController.searchedKeywords);

// DISPLAY A RANDOM RECIPE IN THE FOOTER.
router.get("/dailyrecipe", recipesController.randomRecipe);

// ALLOW THE USER TO BOOKMARK / SAVE A RECIPE IN THE PROPERTY RECIPESSAVED OR RECIPESCOOKED (depend on its choice)
router.post("/savedrecipe", recipesController.savedRecipe)







module.exports = router;