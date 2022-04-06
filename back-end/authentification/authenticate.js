const passport = require("passport")
const jwt = require("jsonwebtoken")
require("dotenv").config() 
/* const dev = process.env.NODE_ENV !== "production"
 */

//COOKIE_OPTIONS is used to create the refresh token cookie, which should be httpOnly and secure so that it cannot be read by the client javascript. 

exports.COOKIE_OPTIONS = {
  httpOnly: true,   // Since localhost has no https protocol, we should choose "false" when we test it
  secure: true, // secure cookies do not work correctly (in postman). switch it to "true" in the prod environment
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  SameSite: "None",  // SameSite is set to "None" since client and server will be in different domains.
}


//getToken is used to create the JWT.
//watch out! I modified that modification to make it clearer, if there are bugs, it might come from here!

exports.getToken = user => {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY),
    }) 
  return token;
}


// getRefreshToken is used to create the refresh token, which itself is a JWT.

exports.getRefreshToken = user => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  })
  return refreshToken;
}


//verifyUser is a middleware that needs to be called for every authenticated request.

exports.verifyUser = passport.authenticate("jwt", { session: false })


// understand authenticate : https://www.passportjs.org/docs/authenticate/
