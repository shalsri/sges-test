'use strict'

const express     = require('express');
const router      = express.Router();
var randomize     = require('randomatic');

const email       = require('../services/sendmail');
var mail          = new email();

const fOtpManager = require('../db/models/fPasswordDB');
var fm            = new fOtpManager();

var otpNum        = randomize('0', 6)
console.log("*****************", otpNum);

router.post('/getotp', (req, res) => {
    console.log("inside otp route");
    console.log(req.body)
    let mailId = req.body.email;
    let msg    = "Reset Password";
    let sub    = "The otp to change you password is" +  " " + otpNum;
    mail.send(msg, sub, mailId);
    fm.saveOtp(otpNum, mailId, res);      
});

router.post('/validateotp', (req, res) => {
    console.log("inside validate otp route");
    console.log("print otp", req.body.otp);
    let otpNum = req.body.otp;
    let email  = req.body.email;
    let ts     = Date.now();
    console.log("print req", otpNum, email, ts)
    fm.validateOtp(otpNum, email, ts, res);
});

router.post('/fnewpassword', (req, res) =>{
    console.log("inside the fnewpassword route");
    let nPass = req.body.newPassword;
    let email = req.body.email;
    fm.changePassword(nPass, email, res);
});

router.post('/resetpassword', (req, res) => {
    console.log("inside the reset password route in forgotPassword");
    let email = req.body.email;
    fm.resetPassword( email, res);
});

module.exports = router;
