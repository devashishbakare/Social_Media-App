const express = require("express");
const app = express();
const port = 8000;
app.use("/", require("./routes/index"));
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views")); or ("views", "views");
app.set("views engine", "./views");



app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`server running on port : ${port}`);
})