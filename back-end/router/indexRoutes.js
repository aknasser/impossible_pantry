const router = require("express").Router();  // On dit à express : "voilà, c'est ici qu'on gère les routes"
const cors = require("cors");
/* require("dotenv").config()
 */


const categories = require("./categoriesRoutes");
const ingredients = require("./ingredientsRoutes")
const recipes = require("./recipesRoutes");
const users = require("./usersRoutes");
const styles = require("./stylesRoutes");

// CORS OPTIONS AND SETTINGS
const whitelist = "http://localhost:3000"
  ? "http://localhost:3000".split(",")
  : []

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },

  credentials: true,
  exposedHeaders: ["set-cookie"],
}



router.use(cors(corsOptions)); // allow us to bypass the CORS restriction when we connect the front-end(React) to the back (NodeJS)




router.use("/categories", categories); 
router.use("/ingredients", ingredients); 
router.use("/recipes", recipes); 
router.use("/users", users); 
router.use("/styles", styles);



module.exports = router;
