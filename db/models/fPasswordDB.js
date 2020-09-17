'use strict'

const User      = require('../models/schemas/user');
const ForgotOtp = require('../models/schemas/fPassword');

const pwdMgr    = require('../../config/passwordmgr');
const pMgr      = new pwdMgr();

const email     = require('../../services/sendmail');
var mail        = new email();

var randomize   = require('randomatic');

async function pSaveOtp(otpNum, mailId, res){
    console.log("inside pSaveOtp async func", otpNum, mailId);

    let result = await User.findOne({"local.email": mailId})
    console.log("print the result user", result);
    
    let uId = result.uniqueUserId;
    let ts  = Date.now();
    console.log("print userid and ts", uId, ts);

    var forOtp =  new ForgotOtp({

        emailId         : mailId,
        timestamp       : ts,
        fOtp            : otpNum,
        uniqueUserId    : uId   
    });

    forOtp.save()
        .then(data => {
            console.log("save success", data);
            res.sendStatus(200);
            // res.send(otpNum);
        })
        .catch(err => {
            console.log("error in saving otp", err);
            res.sendStatus(500);
       });       
}

async function pValidateOtp(otpNum, email, ts, res){
   
    console.log("inside async func pValidateOtp")
    console.log("inside validate otp func");
    console.log("print data", otpNum, email);

    let result = await ForgotOtp.find({emailId: email}).sort({timestamp: -1})
    //console.log("print find data", result);
    console.log("print latest otp and timestamp", result[0].fOtp, result[0].timestamp)
    let tsFive = result[0].timestamp + (5 * 60 * 1000);
    console.log("print time stamp five min", tsFive);
    
    if (ts < tsFive){

        if (result[0].fOtp == otpNum){

            console.log("otp equal");
            res.send({ success: true, message: "otp validated"});
        } else{
            res.send({ success: false, message: "invalid otp"});
        }               
    } else{
        res.send({success: false, message:"otp time expired"});
    }                              
}

async function pResetPassword( email, res){
    console.log("inside async func pResetPassword");
    console.log("print data in reset pwd", email);
    
    var nPass = randomize('A0', 8);
    console.log("++++++++", nPass);

    //send the pwd to user email
    let mailId = email;
    let msg    = "Reset password";
    let sub    = "You new password is" +  " " + nPass;
    mail.sendPwd(msg, sub, mailId);

    let newPass  = pMgr.generateHash(nPass);
    console.log( "*************",newPass);

    //find the user and write the new password into userdb
    let result = await User.findOne({'local.email': email});
    console.log("print the result of user", result, result.uniqueUserId);

    let result1 = await User.findOne({uniqueUserId: result.uniqueUserId});
    console.log("print the user details", result1);
    console.log("print", (result1.local.email))

    await User.updateOne({uniqueUserId: result.uniqueUserId},

        {
            "userName"       : result1.userName,
            "phoneNumber"    : result1.phoneNumber,
            "projectId "     : result1.projectId,
            "role"           : result1.role,
            "local.email"    : (result1.local.email),
            "local.password" : newPass         
        }, 

        {useFindAndModify: false})
    .then(doc => {
        console.log("print the doc", doc);
        res.send(doc);
    })
    .catch(err => {
        console.log("print error", err);
        res.status(500).send;            
    })   
}
async function pChangePassword(nPass, email, res){
    console.log("inside async func pResetPassword");
    console.log("print data in reset pwd", email, nPass);

    //send the pwd to user email
    let mailId = email;
    let msg    = "Reset password";
    let sub    = "You new password is" +  " " + nPass;
    mail.sendPwd(msg, sub, mailId);

    let newPass  = pMgr.generateHash(nPass);
    console.log( "*************",newPass);

    //find the user and write the new password into userdb
    let result = await User.findOne({'local.email': email});
    console.log("print the result of user", result, result.uniqueUserId);

    let result1 = await User.findOne({uniqueUserId: result.uniqueUserId});
    console.log("print the user details", result1);
    console.log("print", (result1.local.email))

    await User.updateOne({uniqueUserId: result.uniqueUserId},

        {
            "userName"       : result1.userName,
            "phoneNumber"    : result1.phoneNumber,
            "projectId "     : result1.projectId,
            "role"           : result1.role,
            "local.email"    : (result1.local.email),
            "local.password" : newPass         
        }, 

        {useFindAndModify: false})
    .then(doc => {
        console.log("print the doc", doc);
        res.send(doc);
    })
    .catch(err => {
        console.log("print error", err);
        res.status(500).send;            
    })   
}

class FotpManager{

    constructor(){}

    saveOtp(otpNum, mailId, res){
        console.log("inside the save otp func");
        console.log("inside saveOtp", otpNum, mailId);
        return pSaveOtp(otpNum, mailId, res);
    }

    validateOtp(otpNum, email, ts, res){
        return pValidateOtp(otpNum, email, ts, res);
    }    

    resetPassword( email, res){
        console.log("inside reset password func");
        return pResetPassword( email, res)
    }

    changePassword(nPass, email, res){
        console.log("inside reset password func");
        return  pChangePassword(nPass, email, res)
    }
}

module.exports = FotpManager;