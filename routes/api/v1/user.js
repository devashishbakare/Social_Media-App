// imported express for use
const express = require("express");

// importing userApi controller 
const userApi = require("../../../controllers/api/v1/user_api");

// Initialize router for routing request
const router = express.Router();

router.post('/create-session', userApi.createSession);

// we have to export to access outside
module.exports = router;