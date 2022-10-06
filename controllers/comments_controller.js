const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require("../models/like");


module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post).populate("user", "name email");
        if(post){            
            try{
                let comment = await Comment.create({
                    content : req.body.content,
                    post : req.body.post,
                    user : req.user._id
                });   
                post.comments.push(comment);
                post.save();

                comment = await comment.populate('user', 'name email');
                //commentMailer.newComment(comment);
                let job = queue.create('emails', comment).save(function(err){
                    if (err) {
                        console.log(err, "error in creating queue");
                        return;
                    }
                    
                    console.log('job in queue ', job.id);
                });

                if (req.xhr){

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

            // deleting the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
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