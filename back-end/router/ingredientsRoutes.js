const router = require("express").Router();
const ingredientsController = require("../controllers/ingredientsController");



router.get("/testCookie", ingredientsController.testCookie);

// R DU CRUD
router.get("/",  ingredientsController.retrieveIngredient, ingredientsController.convertJSON);  
router.get("/unit/:ingredient", ingredientsController.unitFinder);
router.get("/id/:id", ingredientsController.selectedIngredient, ingredientsController.convertJSON);


// C DU CRUD
router.post("/create", ingredientsController.newIngredient);

//U DU CRUD
router.post("/update/:id", ingredientsController.updatedIngredient);

// D du CRUD
router.post("/delete/:id", ingredientsController.deletedObject);








module.exports = router;