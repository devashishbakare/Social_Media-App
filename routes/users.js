const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get("/create-profile", userController.createProfile);
router.get("/profile", userController.profile);
router.use("/post", require("./post"));
module.exports = router;