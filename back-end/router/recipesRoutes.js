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
router.delete("/delete/:id", recipesController.deletedObject);

// FETCH MATCHING RECIPES
router.get("/matchingrecipes/:userId", recipesController.matchingRecipe);

// FETCH DETAIL RECIPES
router.get("/recipesdetails/:recipeId", recipesController.recipeDetails);







module.exports = router;