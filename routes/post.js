const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");

router.get("/like", postController.like);
router.get("/comment", postController.comment);
router.get("/share", postController.share);

module.exports = router;