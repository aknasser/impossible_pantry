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
router.delete("/delete/:id", usersController.deletedObject); 








module.exports = router;