'use strict'

const express =  require('express');
const router = express.Router();
var passport = require('passport');
const UserManager = require('../db/models/userDB');
var um = new UserManager();

module.exports = function(router, passport) {

    //  router.post('/login', passport.authenticate('local-login'),(req, res, next) => {
    //     console.log("inside login route");
    // });
  
//  // show the signup form
// router.get('/signup', function(req, res) {
//     console.log("inside the get route")
//     // res.render('signup.ejs', { message: req.flash('signupMessage') });
//     res.sendStatus(200)
// }
// //     // render the page and pass in any flash data if it exists
// );


// process the signup form
router.post('/signup', passport.authenticate('local-signup'),(req, res) => {
    console.log("inside signup route");
    console.log("print", req.body)

    // successRedirect : '/profile', // redirect to the secure profile section
    // failureRedirect : '/signup', // redirect back to the signup page if there is an error
    // failureFlash : true // allow flash messages
    res.sendStatus(200);
});

router.post('/login', function (req, res, next) {
    console.log("inside login route");    
    passport.authenticate('local-login', {failureFlash: true },function (err, user, info) {  
      console.log("print role in the login route", user.role);    
      console.log("print cookie in login func", req.body)
      if (err) {
          return next(err);
        }      
      if (!user) {
          return res.send({ success: false, message: "invalid login" });
        }
        
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
          return res.send({ success: true, message: "success", role: user.role});
        });
    })(req, res, next);      
      // }      
});

  router.post('/logout', function(req, res) {
    console.log("inside logout func")
      // req.logout();
      req.session.destroy(function() {
        req.logout();
        res.clearCookie('connect.sid');
        // res.redirect('/');
        res.sendStatus(200);
        console.log("cookie", req.cookies)
    });
  });
 
}
