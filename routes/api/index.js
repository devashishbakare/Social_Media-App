// imported express for use
const express = require("express");

// Initialize router for routing request
const router = express.Router();

//version1 router
router.use('/v1', require('./v1'));

//version2 router
router.use('/v2', require('./v2'));


// we have to export to access outside
module.exports = router;