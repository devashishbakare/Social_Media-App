const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// using goole strategy to sign in
passport.use(new googleStrategy({
            clientID : "1070969104763-s6vgpvrt9fhv379qh16s1pm4igl6qsr9.apps.googleusercontent.com",
            clientSecret : "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",
            callbackURL : "http://localhost:8000/user/auth/google/callback"
        },

        // google return some data, and token that we used, example profile having all the info about user
        function(accessToken, refreshToken, profile, done){
            User.findOne({email : profile.emails[0].value}).exec(function(err, user){
                if(err) { console.log("error in getting data from googlr", err); return; }

                console.log(profile);

                if(user){ //if user is there in well in good
                    return done(null, user);
                }else{ // if not present then create the user
                    User.create({
                        name : profile.displayName,
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex')
                    }, function(err, user){
                        if(err) { console.log("error in getting data from googlr", err); return; }

                        return done(null, user);
                    });
                }
            })
        }

));

