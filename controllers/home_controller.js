module.exports.home = function(req, res){
    return res.send("This is from home method");
}

module.exports.checking = function(req, res){
    return res.send("this is from checking method");
};