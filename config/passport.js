var LocalStrategy   = require('passport-local').Strategy;
var User = require('../db/models/schemas/user');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log("inside the func")
        var role = req.body.role
        var phoneNumber = req.body.phoneNumber
        console.log("print values", role )
        process.nextTick(function() {

        User.findOne({ 'local.email' : email }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                var newUser            = new User();
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.role           = role
                newUser.phoneNumber    = phoneNumber
                
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });  

        });
    }));  
    
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        console.log("inside func1")
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if(err){
                console.log("passport.use: General Error in findOne");
                return done(err);
            }

            if(!user){
                console.log("passport.use: No user found");
                //return done(null, false, req.flash('loginMessage', 'No user found'));
               return done(null, false);
            }

            if(!user.validPassword(password)){
                console.log("passport.use Invalid password")
                //return done(null, false, req.flash('loginMessage', 'Wrong Password'))
                 return done(null, false);
            }

            console.log("User found and password correct", user);
            return done(null, user);
        });
    }));
};


