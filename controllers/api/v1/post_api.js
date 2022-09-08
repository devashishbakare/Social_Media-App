const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function(req, res){
    
    let posts = await Post.find({}).sort('-createdAt')
    .populate("user")
    .populate({
        path : "comments", populate : {path : "user"}
    });

    
    return res.json(200, {
        message : "version1 list of posts",
        post : posts
    });
}

module.exports.deletePost = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
            
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});
            return res.json(200, {
                massage : "post has been deleted"
            });
        }else{
            return res.json(401, {
                message : "your are Unathorize to do this action"
            });
        }
            
    
    }catch(err){
    
        return res.json(500, {
            massage : "not able to delete the post"
        });
    }  
}