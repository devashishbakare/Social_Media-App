// Home page after sign in

//importing Post db
const Post = require("../models/post");
const User = require("../models/user");

// now we have need to display all the data so we just have the content and userId 
// fetching/populated feild using userId and display in home page
module.exports.home = async function(req, res){
    
  try{
    let posts = await Post.find({})
    .populate("user")
    .populate({
        path : "comments", populate : {path : "user"}
    });


    let users = await User.find({});
            
    return res.render("home", {
        title : "User Posts",
        posts : posts,
        all_users: users 
    });

  }catch(err){
    console.log("Eroor while populating feils", err);
  }

    
}
