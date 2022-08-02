//Create profile
module.exports.createProfile = function(res, res){
    return res.render("user", {
        title : "create user"
    })
};

//user profile
module.exports.profile = function(req, res){
    return res.render("user", {
        title : "Profile Page"
    })
};