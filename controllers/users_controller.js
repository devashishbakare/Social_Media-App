//exporting user form db 
const User = require("../models/user");

// User sign up 
module.exports.signUp = function( req, res ){
    return res.render("user_sign_up", {
        title : "User sign up"
    });
};

// User sign in
module.exports.signIn = function ( req, res ) {
    return res.render("user_sign_in", {
        title : "User Sign in"
    });
};

// create user via sign in
module.exports.create = function( req, res ) {
    console.log("Im here");
    console.log(req.body);
    // if password and confirm password are not same
    if(req.body.password != req.body.confirm_password) {
        console.log("Confirm password is wrong");
        return res.redirect("back");
    }
    // checking email address are alaredy present or not
    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            console.log("Error while searching email");
            return;
        }
        //if email id not present then add to database
        if( !user ) {
            User.create({
                email : req.body.email,
                password : req.body.password,
                name : req.body.name
            }, function(err, user){
                if(err){
                    console.log("Error : error while adding user to DB");
                    return;
                }else{
                    console.log("Sign up succeessfull");
                    return res.redirect("/user/sign-in");
                }
                
            });
        }// if not added in database so email id is present in database
        else{ 
            console.log("Email id already taken");
            return res.redirect("back");
        }
    })  


}

module.exports.createSession = function ( req, res ) {
    //we will do something here
}