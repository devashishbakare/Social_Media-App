// Home page after sign in

//importing Post, user db
const Post = require("../models/post");
const User = require("../models/user");

// now we need to display all the data so we just have the content and userId 
// fetching/populated feild using userId and display in home page
module.exports.home = async function(req, res){
    
  try{
    //fetching post and populating the user, comment and likes details in that post
    let posts = await Post.find({}).sort('-createdAt')
    .populate("user")
    .populate({
        path : "comments", populate : {path : "user"}, populate: { path: "likes" }
    })
    .populate('comments')
    .populate('likes');


    let users = await User.find({});
            
    return res.render("home", {
        title : "User Posts",
        posts : posts,
        all_users: users 
    });

  }catch(err){
    console.log("Eroor while populating feilds", err);
  }

    
}
