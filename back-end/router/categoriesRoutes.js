const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");



// R DU CRUD
router.get("/",  categoriesController.retrieveCategory, categoriesController.convertJSON);  
router.get("/:id", categoriesController.selectedCategory, categoriesController.convertJSON);

// C DU CRUD
router.post("/create", categoriesController.new_category);

//U DU CRUD
router.post("/update/:id", categoriesController.updatedCategory);

// D du CRUD
router.post("/delete/:id", categoriesController.deletedObject);







module.exports = router;