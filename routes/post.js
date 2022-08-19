// imported express to use
const express = require("express");

// initialize router for routing request
const router = express.Router();

const passport = require("../config/passport-local-strategy");

// importing postController to access its method
const postController = require("../controllers/post_controller");

// Accessing method for specific request
router.post("/create", postController.create);
router.get("/deletePost/:id", passport.checkAuthentication, postController.deletePost);
// exporting module to use outside
module.exports = router;