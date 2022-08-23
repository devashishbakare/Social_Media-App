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
        return res.redirect("back");

    }catch(err){
        console.log("Unable to add Post", err);
        return;
    }   
}

module.exports.deletePost = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});
            return res.redirect("back");
    
        }else {
            return res.redirect("back");        
        }

    }catch(err){
        console.log("Error while finding post", err);
        return;
    }  
}