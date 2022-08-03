// Home page after sign in
module.exports.home = function(req, res){
    
    return res.render("home", {
        title : "Home page" 
    });
}
