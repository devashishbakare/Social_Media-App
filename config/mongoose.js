// imported mongoose
const mongoose = require("mongoose");

// connecting to local host
mongoose.connect("mongodb://localhost/codeial_development");

// initilizing db
const db = mongoose.connection;

// checking for db connection
db.on("error", console.error.bind(console, "Error : To Connecting To MongoDB"));

// returning reponse if connected
db.once("open", function() {
      console.log("Connected to database");
} );

// exporting module for other module to use
module.exports = db;