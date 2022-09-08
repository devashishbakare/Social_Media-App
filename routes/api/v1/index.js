// imported express for use
const express = require("express");

// Initialize router for routing request
const router = express.Router();

//routing post request postApi router
router.use('/post', require('./post'));

//routing createSession request to its api
router.use('/user', require('./user'));

// we have to export to access outside
module.exports = router;