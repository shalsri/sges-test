'use strict'

const User    = require('../models/schemas/user');
const pwdMgr  = require('../../config/passwordmgr');
const pMgr    = new pwdMgr();
const shortid = require('shortid');
// const Project = require('../schemas/project');
var randomize = require('randomatic');

const email   = require('../../services/sendmail');
var mail      = new email();

//for get assigned projects
async function fGetAssignedProjects(userId, res){
    console.log("inside async func fGetAssignedProjects");
    let resultArr = [];
    let result = await User.findOne({uniqueUserId: userId})
   // console.log( "print assigned projects", result);
    var pArr = result.projectId;
    console.log("parr is ", pArr);
    let length = pArr.length
    console.log("length is", length);

    for (var i=0; i< length; i++){
        console.log("********", pArr[i])
        var result1 = await Project.findOne({"projectId": pArr[i]});
        resultArr.push(result1);
        console.log("array after push", resultArr);   
    }
    res.send(resultArr);
    //console.log("result Array is#######", resultArr);
}

//for assign projects
async function assignProj(pId, feAssigned, res){
    console.log("inside async function assignProj");
    console.log("print assigned fe length", feAssigned.length);   
    for(var i=0; i<feAssigned.length; i++){
        let result = await User.findOneAndUpdate({uniqueUserId: feAssigned[i]},{ $push:{projectId: pId}}, {useFindAndModify: false});   
        console.log("result is ;;;;;;;;;;;;;", result);           
    }
}

//for unassign projects
async function unAssignProj(pId, feUnAssigned, res){
    console.log("inside async function unassignProj");
    console.log("print feUnAssigned length", feUnAssigned.length);   
    for(var i=0; i<feUnAssigned.length; i++){
        let result = await User.findOneAndUpdate({uniqueUserId: feUnAssigned[i]},{ $pull:{projectId: pId}}, {useFindAndModify: false});   
        console.log("result unassigned proj is ************", result);           
    }
    res.sendStatus(200);
}

class UserManager {

    constructor(){}

    saveUser(req, res) {

        console.log("inside save function of UserDB");
        let user = new User();

        var newPass = randomize('A0', 8);
        console.log("++++++++", newPass);

        var pHash = pMgr.generateHash(newPass);
        console.log(pHash, "*************");

        //send the pwd to user email
        let mailId = req.body.email;
        let msg    = "Password to login to sges.online";
        let sub    = "Your password is" +  " " + newPass;
        mail.sendPwd(msg, sub, mailId);

        var userIdGenerated = shortid.generate();
          
            user.userName       = req.body.userName
            user.phoneNumber    = req.body.phoneNumber
            user.role           = req.body.role   
            user.local.email    = req.body.email
            user.local.password = pHash
            user.uniqueUserId   = userIdGenerated

            user.save()
            .then(data => {    
                console.log("user save success");
                console.log("print user data", data);
            })
            .catch(err => {
                console.log("error in saving", err);
                res.sendStatus(500);
            })
    };

    getAllUsers(req, res){
        
        console.log("inside get all users func")
        User.find()
        .then(users => {
            console.log("print all users", users);
            res.send(users);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).send
        });
    }

    getOneUser(uId, res){
        
        console.log("inside get one user func")
        User.findOne({uniqueUserId: uId})
        .then(user => {
            console.log("print one user", user);
            res.send(user);
        })
        .catch(err => {
            console.log("error in finding one user", err)
            res.status(500).send
        });
    }

    getUserList(req, res){

        let response = [{
            "name" : "",
            "phone": "",
            "email": ""
        }]
        console.log("inside getUsersList func");
        User.find()
        .then(users => {
            for(var i=0; i< users.length; i++){
                response.push({
                    "email": users[i].local.email,
                    "phone": users[i].phoneNumber,
                    "name": users[i].userName
                })
            }
        
            console.log("print****************", response)
            res.send(response)
        })
        .catch(err => {
            console.log("print error", err)
            res.status(500).send
        });
    }

    getUsersByRole(userRole, res){
        console.log("inside get users by role func");
        User.find({role: userRole})
        .then(usersByRole => {
            console.log("users by role", usersByRole);
            res.send(usersByRole);
        })
        .catch(err => {
            console.log("print error", err);
            res.status(500).send
        })
    }

    getUserNames(req, res){
        var uIdArray = [];
        console.log("inside get user names func");
        User.find()
        .then(users =>{
            console.log("list of users: ", users);
            console.log("users length", users.length);
            for (var i=0; i< users.length; i++){
                //console.log("print user names", users[i].userName);
                uIdArray.push({
                    "uniqueUserId" : users[i].uniqueUserId,
                    "userName"     : users[i].userName});
            }
            //console.log("********************", uIdArray);
            res.send(uIdArray);
        });
    };

    getAssignedProjects(userId, res){
        console.log("inside the assigned projects route userdb");
        return fGetAssignedProjects(userId, res);
    }

    //assigned proj
    assignedProject(pId, feAssigned, res) {
        console.log("inside assign project func in userdb", feAssigned);
        assignProj(pId, feAssigned, res);          
    }

    //un assign proj
    unAssignedProject(pId, feUnAssigned, res) {
        console.log("inside unassign project func in userdb", feUnAssigned);
        User.updateOne({uniqueUserId: feUnAssigned},{$pull:{projectId: pId}}, {useFindAndModify :false}) 
        .then(user => {
            console.log("user after unassign", user)
        })
        .catch(err => {
            console.log("error in unassign", err);
            res.status(500).send;            
        })
    }

    deleteUser(uId, res){
        console.log("inside delete user function");
        console.log("print user in delete", uId)
        User.findOneAndRemove({uniqueUserId: uId}, {useFindAndModify:false})
        .then(doc =>{
            console.log("entry deleted");
        })
        .catch(err => {
            console.log("print error", err);
            res.status(500).send;            
        })           
    };

    updateUser(req, uId, res){
        console.log("inside update function of user");
        console.log("uniqueUser id ",uId)

        User.updateOne({uniqueUserId:uId}, 
            {
                "userName"       : req.body.userName,
                "phoneNumber"    : req.body.phoneNumber,
                "projectId "     : req.body.projectId,
                "role"           : req.body.role,
                "local.email"    : req.body.email,
                "local.password" : req.body.password          
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
    };
}

module.exports = UserManager;
