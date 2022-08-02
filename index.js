const express = require("express");
const app = express();
const port = 8000;
//import exress-ejs-layouts
const expressLayouts = require("express-ejs-layouts");
//assets use
app.use(express.static("./assets"));
//use by app
app.use(expressLayouts);
// Telling layouts to use style and script at right location
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


app.use("/", require("./routes/index"));
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views")); or ("views", "views");
app.set("views", "./views");



app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`server running on port : ${port}`);
})