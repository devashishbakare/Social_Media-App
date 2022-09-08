const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function ( req, res ) {
   
    try{
        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message : "invalid username/passowrd"
            });
        }

        return res.json(200, {
            message : "sign in successfully, keep your token safe",
            data : {
                token : jwt.sign(user.toJSON(), "justShare", {expiresIn : "100000"})
            }
        });
    }catch(err){
        return res.json(500, {
            massage : "Internal server error"            
        });
    }
    
}