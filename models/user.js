// imported mongoose to use
const mongoose = require("mongoose");

const multer = require("multer");

const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");

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
    avatar : {
        type : String
    },
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship' 
        }
    ] 
}, {//timestanp for created and updated info
    timestamps : true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
  
  //static calling

  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;


//assigning name to schema
const User = mongoose.model("User", userSchema);

// exporting module to use for other module
module.exports = User;