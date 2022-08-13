// post controller
//impoting Post db from models
const Post = require("../models/post");

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

// user like method call
module.exports.like = function(req, res) {
    return res.render("post",{
        title : "user is posting photoes and vedios"
    })
};

// user comment method call
module.exports.comment = function(req, res) {
    return res.render("post",{
        title : "user is posting photoes and vedios"
    })
};

// user share method call
module.exports.share = function(req, res) {
    return res.render("post",{
        title : "user is posting photoes and vedios"
    })
};

