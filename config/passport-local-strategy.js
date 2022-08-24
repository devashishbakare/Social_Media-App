//importing passport and local-strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// imported a use schema/document
const User = require("../models/user");

// assigning userfeild as email and validating email and password
passport.use(new LocalStrategy({
    
    usernameField : "email",
    passReqToCallback : true

}, function(req, email, password, done){
    User.findOne({email : email}, function(err, user){
        if(err) {
            req.flash("error", "Invalid UserName/Password");
            return done(err);
        }

        if(!user || user.password != password){
            req.flash("error", "Invalid UserName/Password");
            return done(null, false);
        }

        return done(null, user);
    });
}
));


// serializing : adding cookies with info-> session cookie

passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deSerialize : using this cookie to help browser to understand the user,
// fetching data, which set by serialize, deserialize function fetch that id and check in session cookie

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("not able to find out the userId in cookie");
            return done(err);
        }
        return done(null, user);
    })
})

// checking whether user is authenticated or not
passport.checkAuthentication = function(req, res, next){
    if( req.isAuthenticated() == true ){
        return next();
    }
    //if not then redirect to sign in page, he trying to access page without logged-in/sign-in
    return res.redirect("/user/sign-in");
}


passport.setAuthenticatedUser = function( req, res, next){
    
    //req.user is having user info which are in passport now
    //now using passport we sign in and added cookie to brower but we dont get data in views yet, so we storing to locals
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    
    next();
}

module.exports = passport;