const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){            
            try{
                const comment = await Comment.create({
                    content : req.body.content,
                    post : req.body.post,
                    user : req.user._id
                });   
                post.comments.push(comment);
                post.save();
                req.flash("success", "Comment has been posted");
                return res.redirect("back");

            }catch(err){
                console.log("Unable to add comment in db", err);
                req.flash("error", "Unable to add comment");
                return res.redirect("back");
            }             
        }        
    }catch(err){
        console.log("Post Not Found While Adding comment", err);
        return;
    }
   
}


module.exports.deleteComment = async function(req, res){
    
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull : {comments : req.params.id}});
            req.flash("success", "comment deleted successfully");
            return res.redirect("back");
            
        }else{
            req.flash("error", "Error while deleting comment");
            return res.redirect("back");
        } 

    }catch(err){
        console.log("Comment Not Found", err);
        return;
    }
    
    
}