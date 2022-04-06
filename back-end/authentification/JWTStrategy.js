// To maintain the user session using JWT token and refresh Token

const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/users");

require("dotenv").config() 

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
/* opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'nassmassa.com';
 */

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      // Check against the DB only if necessary.
      // This can be avoided if you don't want to fetch user details in each request.
      console.log(`SHOW ME THE JWT : ${jwt_payload._id}`);
      User.findById(jwt_payload._id, function (err, user) {
        if (err) {
            console.log("error to get during the authentification using jwt_payload_id")
          return done(err, false)
        }
        if (user) {
            console.log("we found the user. Cool.")
          return done(null, user)
        } else {
            console.log("the fuck just happened ?");
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )


// WEBSITE TO CHECK THE TOKEN : https://jwt.io/#debugger-io