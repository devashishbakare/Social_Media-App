// imported express to use
const express = require("express");

// initialize router for routing request
const router = express.Router();

// importing userController
const userController = require("../controllers/users_controller");

// Accessing method specifit to url
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.post("/createUser", userController.create);

// exporting module to access outside
module.exports = router;