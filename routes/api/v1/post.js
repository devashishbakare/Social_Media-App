// imported express for use
const express = require("express");

//importing passport for authenticate at router level
const passport = require('passport');

// Initialize router for routing request
const router = express.Router();

// importing controller for postApi
const postApiV1 = require("../../../controllers/api/v1/post_api");
 
router.get('/', postApiV1.index);
router.delete('/:id', passport.authenticate('jwt', {session : false}), postApiV1.deletePost);

// we have to export to access outside
module.exports = router;