const router = require("express").Router();
const usersController = require("../controllers/usersController");
const passport = require("passport");
const { use } = require("passport");


router.get("/cookie/test", usersController.testCookie);

// R DU CRUD
router.get("/",  usersController.retrieveUser, usersController.convertJSON);  
router.get("/:id", usersController.selectedUser, usersController.convertJSON);

// C DU CRUD  + PASSWORD MGMT THROUGH PASSPORT.

router.post("/create", usersController.signUp);

//U DU CRUD
router.post("/update/:id", usersController.updatedUser);

// D du CRUD
router.post("/delete/:id", usersController.deletedObject); 

// MANAGE STOCK UPDATE AT THE END OF INSIDE YOUR STOCK FORM
router.post("/stockupdate/:id", usersController.updateStock);

// USER LOGIN AND AUTHENTIFICATION
router.post("/login",passport.authenticate("local"), usersController.login);

// REFRESH TOKEN
router.post("/refreshtoken", usersController.refreshToken);

// LOGOUT 
router.get("/logout/:id", usersController.logout);







module.exports = router;