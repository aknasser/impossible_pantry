const User = require("../models/users");
const Ingredient = require("../models/ingredients");
const Recipe = require("../models/recipes");
const helper = require("./helpers_functions/users_functions");
const jwt = require("jsonwebtoken");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authentification/authenticate");
const { findOne } = require("../models/users");


module.exports = {

    testCookie : async(req, res) => {
        res.cookie("Hero", "Nass La Menace", COOKIE_OPTIONS);
        res.send("Babyyyyyy");
    },

    retrieveUser : async (req, res, next) => {
        const allUser = await User.find({}).sort({createdAt : -1});
        res.locals.toConvert = allUser;   // On cale allUser dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     

    selectedUser : async(req, res, next) => {
        const idUser = req.params.id;                     
        
        // We use populate() to have access  tot the property of "ingredient" within the property "stock" 
        const chosenUser = await User.findById(idUser).populate({
            path : "stock",
            populate : {
                path : "ingredient",
                model : "Ingredient"
            }
        })
        res.locals.toConvert = chosenUser;
        next();
    },

    newUser : async(req, res) => {
        const newUser = req.body;
        
        //1 - We find the Object ID for the recipes stored in recipesSearched and recipesCooked
        let recipesSaved = await helper.find_recipes(newUser.recipesSaved);
        let recipesCooked = await helper.find_recipes(newUser.recipesCooked);
        
        // 2 - We create the new user in the DB
         const newEntry = await User.create({
            name : newUser.name,
            surname : newUser.surname,
            username : newUser.username,
            recipesSaved : recipesSaved,
            recipesCooked : recipesCooked,
            stock : newUser.stock
        })
        res.send("new user created!"); 
    },

    updatedUser : async(req, res) => {
        let userUpdated = req.body
        let objectId = req.params.id;

        const entryToUpdate = await User.findByIdAndUpdate(objectId, {
            $set : {
                name : userUpdated.name,
                surname : userUpdated.surname,
                username : userUpdated.username,
                recipesSaved : userUpdated.recipesSaved,
                recipesSearched : userUpdated.recipesSearched,
                recipesCooked : userUpdated.recipesCooked,
                stock : userUpdated.stock
            },
        },
        {new : true}
        )
        res.send("entry updated!");

    },

    updateStock : async(req, res) => {
        let newStock = [];
        const userId = req.params.id;
        let foodSubmitted = req.body;  // The hash table we have created using ingredient submitted by the user in the front-end.
/*         console.log (`the stock updated : ${JSON.stringify(foodSubmitted)}`); */

        // 1 - We add each ingredient collected from the request in the array newStock

        // a - We loop iterates over all the properties of the object foodSubmitted with FOR...IN.
        for (let key in foodSubmitted) {
            const food = foodSubmitted[key]; // We use [key] instead of .key because we want to use the VALUE/STRING encapsulated in the variable key. If we use .key, the server will look for the property key (which doesn't exist).   
            // a - Look for the ingredient corresponding in the DB
            const foodId = await Ingredient.findOne({ name : food.ingredient.name });
            // b - we create an object to contains ingredient and the quantity available (the quantity is part of the food object created by the user while submitting the form). 
            const newIngredient = await {
                ingredient : foodId,
                quantity : food.quantity,
            } ;            
            // c - we push this new object in the object newStock
            newStock.push(newIngredient); 

        };

      //console.log(`NEW STOCK ARRAY : ${JSON.stringify(newStock)}`);

        // 2 - We update user.stock with newStock

        const user_updated = await User.findByIdAndUpdate(userId, {
            $set : {
                stock : newStock
            },
        },
        {new : true}
        )
        // 3 - We send a response to the client. Thanks to this response, the client know that the update has been done he can move on with the rest of the code (redirection towards the results page).
        res.send({message :"Stock has been updated sucessfully!", user : user_updated});
    },

    deletedObject : async(req, res) => {
        const object_to_delete_id = req.body._id;
        const entryToDelete = await User.findByIdAndRemove(object_to_delete_id);
        res.send("user removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);


    },

    //AUTH MODULES - Dedicated to login, signup and token mgmt
    

    signUp :  async(req, res, next) => {

        const newUser = req.body;
        console.log(newUser);
        //1 - We find the Object ID for the recipes stored in recipesSearched and recipesCooked
        let recipesSaved = await helper.find_recipes(newUser.recipesSaved);
        let recipesCooked = await helper.find_recipes(newUser.recipesCooked);

        // UserModel.register() is a method from passport-local-mongoose.
        // PARAM 1 : the user details to save in the DB |PARAM 2 : The password chosen by the user. |PARAM 3 : A function to be executed during the registration process, take 2 params : error and the user we just have created
        User.register(                                 
            new User({
                name : newUser.name,
                surname : newUser.surname,
                username : newUser.username,
                recipesSaved : recipesSaved,
                recipesCooked : recipesCooked,
                stock : newUser.stock
            }),      
            newUser.password,
            (err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.send(`issues to register user : ${err}`)
                } else {
                    // If all gucci, we defined user.name and user.name with the value send to the back during the request.
                    user.name = req.body.name;
                    //We define a new token for the user thanks to they id.
                    const token = getToken({_id: user._id}); 
                    // We define a new refresh token for user thanks to they id.
                    const refreshToken = getRefreshToken({_id:user._id});
                    // We push the refreshToken in the new user array. (guess what ? this refreshToken will change over time somewhere in my code).
                    user.refreshToken.push({refreshToken});
                    user.save((err, user) => {
                        if (err) {
                            res.statusCode = 500;
                            res.send(`We can't save the user with the refreshToken : ${err}`);
                        } else {
                            //While saving the user we send cookie(name, value, options) and some info in the response. 
                            // enable us to get the token in the front-end.boom. We will use it to define UseContext in React
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                            res.send( { success: true, token: token, user : user } );     
                        }
                    })
                }
            }
        )
        err => next(err)    
    },



    login : async (req, res, next) => {
        const user_info = req.body;
        // 1 - we find the user id in the DB
        const user = await User.findOne({username : user_info.username});
       console.log(`user Stock : ${JSON.stringify(user.stock)}`)
        // 2 - We create a new toKen + new refreshToken
        const token = getToken({_id: user._id});        // We can use other tactic to collect the user id (throug req.body if the user submit a form for instance)   
        const refreshToken = getRefreshToken({_id: user._id});
        const user_to_logged_in = await User.findById(user._id).populate({
          path : "stock",
          populate : {
              path : "ingredient",
              model : "Ingredient"
          }
      });     
        user_to_logged_in.refreshToken.push({refreshToken});
        console.log(`user_to_logged_in (stock): ${user_to_logged_in.stock}`);
        // 3 - We save the user in the DB to update token and refreshToken
        user_to_logged_in.save((err, user) => {                           
            if (err) {
                res.statusCode = 500;
                res.send(`ERROR SPOTTED DURING THE LOGIN PROCESS :${err}`)
            } else {
                res.statusCode = 200;
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                // 4 - We send the token in the response. The token is then available for the client.
                res.send({ success: true, token : token, refreshToken : refreshToken, user: user_to_logged_in});
            }
        })
        err => next(err);
    },





    refreshToken : async(req, res, next) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies
        console.log(`TOKEN DURING REFRESHTOKEN : ${JSON.stringify(refreshToken)}`);
        if (refreshToken) {
          try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id
            const user = await User.findById(userId).populate({
              path : "stock",
              populate : {
                  path : "ingredient",
                  model : "Ingredient"
              }
            });     
            if (user) {
              // Find the refresh token against the user record in database
              const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
              )
              console.log(`user found : ${user.username || "no user found"}`);
              if (tokenIndex === -1) {                  // means that the there is no refreshToken stored in the DB ?
                res.statusCode = 401
                res.send({message : "No refresh Token found in the DB"});
              } else {
                const token = getToken({ _id: userId })
                // If the refresh token exists, then create new one and replace it.
                const newRefreshToken = getRefreshToken({ _id: userId })
                user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                user.save((err, user) => {
                  if (err) {
                    res.statusCode = 500
                    res.send(err)
                  } else {
                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                    res.send({ success: true, token : token, user_info : user, message: "We dit it ma man!" });
                  }
                })
              }
            } else {
              res.statusCode = 401
              res.send({ message :"We couldn't find any user with this id"});
            }
            err => next(err)
          } catch (err) {
            res.statusCode = 401
            res.send({message : "We encountered issue to process the token" + err});
          }
        } else {
/*           res.statusCode = 401
 */          res.send({ message : "Refresh Token can't be found in the cookie!"});
        }
    },

    logout: (req, res, next) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies
        User.findById(req.params.id).then(
          user => {
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )
            if (tokenIndex !== -1) {            // If the token exist in the DB
              user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            } else {
                console.log("the token does NOT exist (apparently)");
            }
            user.save((err, user) => {
              if (err) {
                res.statusCode = 500
                res.send(`Trouble to logout : ${err}`);
              } else {
                res.clearCookie("refreshToken", COOKIE_OPTIONS)  // we remove 'refreshToken' from the cookies
                res.send({ success: true, message : "logout successful the token has been removed" })
              }
            })
          },
          err => next(err)
        )
      }
};

