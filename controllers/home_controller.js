module.exports.home = function(req, res){
    return res.render("home", {
        title : "Home page" 
    });
}

module.exports.checking = function(req, res){
    return res.send("this is from checking method");
};