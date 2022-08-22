// Home page after sign in

//importing Post db
const Post = require("../models/post");
const User = require("../models/user");


module.exports.home = function(req, res){
    
    // now we have need to display all the data so we just have the content and userId 
    // fetching/populated feild using userId and display in home page
    Post.find({})
    .populate("user")
    .populate({
        path : "comments", populate : {path : "user"}
    })
    .exec(function(err, posts){
        
        if(err){console.log("error in finding");}

        User.find({}, function(err, users){
            if(err){console.log("unable to fetch all the user");}
            return res.render("home", {
                title : "User Posts",
                posts : posts,
                all_users: users 
            });
        })

        
    });

}
