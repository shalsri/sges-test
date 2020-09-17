'use strict'

const express =  require('express');
const router = express.Router();
const isLoggedIn =  require('../config/isLoggedIn');
const UserManager = require('../db/models/userDB');
var um = new UserManager();

router.post('/', (req, res) => {
    console.log("in post route");
    console.log(req.body.userName);
    console.log(req.body.phoneNumber);
    console.log(req.body.role);
    console.log(req.body.email);
    um.saveUser(req, res);
    res.sendStatus(200);
});

router.get('/', (req, res)=> {
    console.log("inside get route")
    let userRole = req.query.role;
    if (userRole == null){
        um.getAllUsers(req, res);
    } else{
        um.getUsersByRole(userRole, res);
    }    
});

router.get('/usernames', isLoggedIn, (req, res)=> {
    console.log("inside get usernames route");
    um.getUserNames(req, res);
});

router.get('/userList', isLoggedIn, (req, res) => {
    console.log("inside usersList route");
    um.getUserList(req, res);
});

router.get('/oneUser/:uniqueUserId', isLoggedIn, (req, res) => {
    console.log("inside get one user route");
    let uId = req.params.uniqueUserId;
    um.getOneUser(uId, res);
});

router.post('/updateUser/:uniqueUserId', isLoggedIn, (req, res) => {
    console.log("inside the edit user route");
    let uId = req.params.uniqueUserId;
    um.updateUser(req, uId, res);
});

router.delete('/:uniqueUserId', (req, res) => {
    console.log("inside the delete user route");
    let uId = req.params.uniqueUserId;
    um.deleteUser(uId);
    res.sendStatus(200);    
});

module.exports = router;