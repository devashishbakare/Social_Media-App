const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Erro : To Connecting To MongoDB"));

db.once("open", function() {
      console.log("Connected to database");
} );

module.exports = db;