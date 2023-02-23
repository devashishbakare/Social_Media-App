const express = require("express");

const router = express.Router();

const passport = require("passport");

const commentController = require("../controllers/comments_controller");

router.post("/create", passport.checkAuthentication, commentController.create);
router.get("/deleteComment/:id", passport.checkAuthentication, commentController.deleteComment);
router.get("/display/:id", commentController.displayComments);
router.get("/close/:id", commentController.close);
module.exports = router;