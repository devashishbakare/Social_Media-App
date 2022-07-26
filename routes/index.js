const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

// accesing methods from controllers
router.get("/", homeController.home);
router.get("/check", homeController.checking);

//for /user rout telling router to check in users router
router.use("/user", require("./users"));
module.exports = router;