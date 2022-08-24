// post controller
//impoting Post db from models
const Post = require("../models/post");

//importing commnet module 
const Comment = require("../models/comment");

//Adding content from user
module.exports.create = async function(req, res){

    try{
        await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        req.flash("success", "Posted you througts!!");
        return res.redirect("back");

    }catch(err){
        req.flash("error", "Error while sharing your post");
        return res.redirect("back");
    }   
}

module.exports.deletePost = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});
            req.flash("success", "Post has been deleted");
            return res.redirect("back");
    
        }else {
            return res.redirect("back");        
        }

    }catch(err){
        req.flash("error", "Unable to delete post");
        return res.redirect("back");
    }  
}