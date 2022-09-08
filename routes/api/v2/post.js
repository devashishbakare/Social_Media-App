// imported express for use
const express = require("express");

// Initialize router for routing request
const router = express.Router();

// importing controller for postApi
const postApiV2 = require("../../../controllers/api/v2/post_api");
 
router.get('/', postApiV2.index);

// we have to export to access outside
module.exports = router;