// Home page after sign in

//importing Post db
const Post = require("../models/post");


module.exports.home = function(req, res){
    
    // now we have need to display all the data so we just have the content and userId 
    // fetching/populated feild using userId and display in home page
    Post.find({}).populate("user").exec(function(err, posts){
        
        if(err){console.log("error in finding");}

        return res.render("home", {
            title : "User Posts",
            posts : posts
        });
    });

}
