module.exports.like = function(req, res) {
    return res.send("<h1>user like your photo</h1>");
};

module.exports.comment = function(req, res) {
    return res.send("<h1>user commneted on you photo</h1>");
};

module.exports.share = function(req, res) {
    return res.send("<h1>user share you photo</h1>");
};

