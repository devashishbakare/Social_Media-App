const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){            
            try{
                let comment = await Comment.create({
                    content : req.body.content,
                    post : req.body.post,
                    user : req.user._id
                });   
                post.comments.push(comment);
                post.save();

                if (req.xhr){

                  //comment = await comment.populate('user', 'name').execPopulate();

                    console.log("comment", comment);
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "comment has been added!"
                    });
                }
            
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

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "comment has been deleted!"
                });
            }

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