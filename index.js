// imported express
const express = require("express");

// imported cookies after install
const cookieParser = require("cookie-parser"); 

// Firring express and set up a port
const app = express();
const port = 8000;

// use cokkieParser to parse the cookies
app.use(cookieParser());

// encode the data which is comming from form
app.use(express.urlencoded());

//import exress-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

// Importing db
const db = require("./config/mongoose");

// Importig UserDB
const User = require("./models/user");

//assets use
app.use(express.static("./assets"));

//use by app
app.use(expressLayouts);

// Telling layouts to use style and script at right location
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Telling app to use this for all routing
app.use("/", require("./routes/index"));

// Setting view engine app ejs
app.set("view engine", "ejs");

// Look for views in views folder
app.set("views", "./views");


// Setting up the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`server running on port : ${port}`);
})