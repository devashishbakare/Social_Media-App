// imported express
const express = require("express");

// imported cookies after install
const cookieParser = require("cookie-parser"); 

// Firring express and set up a port
const app = express();
const port = 8000;

// encode the data which is comming from form
app.use(express.urlencoded());

// use cokkieParser to parse the cookies
app.use(cookieParser());

//import exress-ejs-layouts
const expressLayouts = require("express-ejs-layouts");

// Importing db
const db = require("./config/mongoose");

// Importig UserDB
const User = require("./models/user");

// use for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/possport-jwt-strategy");
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
app.use(sassMiddleware({

    src :"./assets/scss",
    dest :"./assets/css",
    debug : true,
    outputStyle :"extended",
    prefix : "/css"

}));


//assets use
app.use(express.static("./assets"));

//upload path use
app.use('/uploads', express.static(__dirname + '/uploads'));

//use by app
app.use(expressLayouts);

// Telling layouts to use style and script at right location
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Setting view engine app ejs
app.set("view engine", "ejs");

// Look for views in views folder
app.set("views", "./views");

// middleware for session cookie
// using mongoStore to store the cookie info so that we can stay logged in even if server stop working
app.use(session(
    {
        name : "codeil",
        //Todo : need to change this secret here
        secret : "somethingHere",
        saveUninitialized : false,
        resave : false,
        cookie : { maxAge : (1000 * 60 * 100) },
        store: MongoStore.create(
            {
                mongoUrl : "mongodb://localhost/codeial_development",
                mongooseConnection : db,
                autoRemove: "disabled"
            }, 
            function(err){
                console.log(err || "connect-mongo setup ok");
           }
        ) 
    }   
    
));

app.use(passport.initialize());
app.use(passport.session());

//setting user details to access in views
app.use(passport.setAuthenticatedUser);

//setting up the flash connect
app.use(flash());
//adding middleware 
app.use(customMiddleware.setFlash);

// Telling app to use this for all routing
app.use("/", require("./routes/index"));

// Setting up the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`server running on port : ${port}`);
})