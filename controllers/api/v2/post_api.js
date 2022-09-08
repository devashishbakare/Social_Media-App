module.exports.index = function(req, res){
    return res.json(200, {
        massage : "version 2 all post",
        post : []
    });
}