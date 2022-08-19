// post controller
//impoting Post db from models
const Post = require("../models/post");

//importing commnet module 
const Comment = require("../models/comment");

//Adding content from user
module.exports.create = function(req, res){

    Post.create({
        content : req.body.content,
        user : req.user._id
    }, function( err, post){
        if(err){console.log("Not able to add content to post Db")}
        return res.redirect("back");
    });

}

module.exports.deletePost = function(req, res){

Post.findById(req.params.id, function(err, post){

    if(err) {
        console.log("Post not found:");
    }else{
        if(post.user == req.user.id){
            console.log(post.id);
            console.log(req.user.id);
            post.remove();

            Comment.deleteMany({post : req.params.id}, function(err){
                if(err) {
                    console.log("Unable to delte this comment");        
                }else{
                    return res.redirect("back");
                }
            });
        }else {
            return res.redirect("back");        
        }
    }

    
    

});
}