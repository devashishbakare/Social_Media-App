// imported express to use
const express = require("express");

// initialize router for routing request
const router = express.Router();

// imported passport 
const passport = require("passport");


// importing userController
const userController = require("../controllers/users_controller");

// Accessing method specifit to url
router.get("/profile/:id", passport.checkAuthentication ,userController.profile);
router.get("/editProfile", userController.editProfile);
router.post("/updateProfile/:id", userController.updateProfile);
router.get("/sign-up",userController.signUp);
router.get("/sign-in", userController.signIn);
router.post("/createUser", userController.create);
router.get("/home", passport.checkAuthentication, userController.home);

router.post("/create-session", 
passport.authenticate( "local", { failureRedirect : "/user/sign-in"}), userController.createSession);

router.get("/sign-out", userController.deleteSession);

router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'user/sign-in'}), userController.createSession);


// exporting module to access outside
module.exports = router;