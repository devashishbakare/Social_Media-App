// imported express to use
const express = require("express");

// initialize router for routing request
const router = express.Router();

// importing postController to access its method
const postController = require("../controllers/post_controller");

// Accessing method for specific request
router.get("/like", postController.like);
router.get("/comment", postController.comment);
router.get("/share", postController.share);

// exporting module to use outside
module.exports = router;