const router = require("express").Router();
const stylesController = require("../controllers/stylesController");



// R DU CRUD
router.get("/",  stylesController.retrieveStyle, stylesController.convertJSON);  
router.get("/:id", stylesController.selectedStyle, stylesController.convertJSON);

// C DU CRUD
router.post("/create", stylesController.newStyle);

//U DU CRUD
router.post("/update/:id", stylesController.updatedStyle);

// D du CRUD
router.delete("/delete/:id", stylesController.deletedObject);








module.exports = router;