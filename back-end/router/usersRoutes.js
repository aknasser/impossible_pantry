const router = require("express").Router();
const usersController = require("../controllers/usersController");



// R DU CRUD
router.get("/",  usersController.retrieveUser, usersController.convertJSON);  
router.get("/:id", usersController.selectedUser, usersController.convertJSON);

// C DU CRUD
router.post("/create", usersController.newUser);

//U DU CRUD
router.post("/update/:id", usersController.updatedUser);

// D du CRUD
router.post("/delete/:id", usersController.deletedObject); 

// MANAGE STOCK UPDATE AT THE END OF INSIDE YOUR STOCK FORM
router.post("/stockupdate/:id", usersController.updateStock);







module.exports = router;