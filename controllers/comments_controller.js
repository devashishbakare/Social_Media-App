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
                    
                return res.redirect("back");

            }catch(err){
                console.log("Unable to add comment in db", err);
                return;
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
            return res.redirect("back");
            
        }else{
            return res.redirect("back");
        } 

    }catch(err){
        console.log("Comment Not Found", err);
        return;
    }
    
    
}