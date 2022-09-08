// imported express for use
const express = require("express");

// Initialize router for routing request
const router = express.Router();

router.use('/post', require('./post'));

// we have to export to access outside
module.exports = router;