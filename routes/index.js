// imported express for use
const express = require("express");

// Initialize router for routing request
const router = express.Router();

// importing homeController
const homeController = require("../controllers/home_controller");

// accesing methods from controllers
router.get("/", homeController.home);

// routing request of user to user router
router.use("/user", require("./users"));

//rounting request of post for post router
router.use("/post", require("./post"));

// we have to export to access outside
module.exports = router;