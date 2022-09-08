//exporting user form db 
const User = require("../models/user");
const fs = require('fs');
const path = require('path');


module.exports.profile = async function( req, res){
    try{
        let user = await User.findById(req.params.id);
        
        return res.render("user_profile", {
            title : "profile page",
            user_profile : user

        });    
    }catch(err){
        console.log("Error while displaying profile", err);
        return;
    }  
}

module.exports.editProfile = function(req, res){
    return res.render("edit_Profile", {
        title : "Edit Profile"
    });
}

module.exports.updateProfile = async function(req, res){

    if(req.user.id == req.params.id){

        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) { console.log("**Multer Error**", err) }
                //console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect("back");
            });
        }catch(err){
            console.log("uesr not authrized", err);
            return res.redirect("back");
        }
    }else{
        return res.status(401).send("Unathorized");
    }

}

// User sign up 
module.exports.signUp = function( req, res ){
    
    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }
    return res.render("user_sign_up", {
        title : "User sign up"
    });
};

// User sign in
module.exports.signIn = function ( req, res ) {
    
    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }
    return res.render("user_sign_in", {
        title : "User Sign in"
    });
};

// create user via sign in
module.exports.create = async function( req, res ) {
    
    // if password and confirm password are not same
    if(req.body.password != req.body.confirm_password) {
        req.flash("error", "Enter confirm password again");
        return res.redirect("back");
    }

    try{
        // checking email address are alaredy present or not
        let user = await User.findOne({email: req.body.email});
        if( !user ) {
            User.create({
                email : req.body.email,
                password : req.body.password,
                name : req.body.name
            }, function(err, user){
                if(err){
                    req.flash("error", "Something went wrong");
                    return;
                }else{
                    req.flash("success", "Sign Up Successfully");
                    return res.redirect("/user/sign-in");
                }
                
            });
        }// if not added in database so email id is present in database
        else{ 
            req.flash("error", "Email ID already taken");
            return res.redirect("back");
        }

    }catch(err){
        console.log("Enable to find user", err);
        return;
    }
}

module.exports.createSession = function ( req, res ) {
    req.flash("success", "Logged in successfully");
    return res.redirect("/");
}

module.exports.deleteSession = function(req, res){

    req.logout(function(err){
        if(err){
            return next(err);
        }         
    });   
    req.flash("success","Logged out successfully");
    return res.redirect("/");
}

module.exports.home = function(req, res){
    return res.redirect("/");
}
