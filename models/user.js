// imported mongoose to use
const mongoose = require("mongoose");

// creaeted document/schema
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
}, {//timestanp for created and updated info
    timestamps : true
})

//assigning name to schema
const User = mongoose.model("User", userSchema);

// exporting module to use for other module
module.exports = User;