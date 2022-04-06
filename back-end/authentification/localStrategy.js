// To allow the user to login with they username / password

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
 
//Called during login/sign up.
passport.use(new LocalStrategy(User.authenticate()))
 
//called after the user is logged in / signed up to set user details in req.user
passport.serializeUser(User.serializeUser())
