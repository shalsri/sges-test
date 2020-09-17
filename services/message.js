const express   = require('express');
var request     = require('request');
const User      = require('../db/models/schemas/user');

// var FormData = require('form-data');

async function fSendSMS(feAssigned, res){

  var userNames = [];
  var userPhNumbers = [];
  var uName = null;
  var phNos = null;
  console.log("inside async function message manager");
  console.log(feAssigned, "feassigned");
  console.log("print assigned fe length", feAssigned.length)    
  for(var i=0; i<feAssigned.length; i++){
    let result = await User.findOne({uniqueUserId: feAssigned[i]}).exec()
    console.log("result is ;;;;;;;;;;;;;", result);  
    // console.log("print names", result.userName);
    // console.log("print phone numbers", result.phoneNumber);  
    userNames.push(result.userName);
    userPhNumbers.push(result.phoneNumber);
    //console.log("print names", (userNames).toString());
    //console.log("print phone numbers", (userPhNumbers.toString()));  
  }
    uName = (userNames).toString()
    phNos = (userPhNumbers.toString())
    console.log("print names", uName);
    console.log("print phnos", phNos);

    var formData = {
      'From'        : 'SGESms',
      'To'          :  phNos,
      'TemplateName': 'Project Assignment'
        
    }      
    request.post({url: 'http://2factor.in/API/V1/0b1dd668-3cd9-11ea-9fa5-0200cd936042/ADDON_SERVICES/SEND/TSMS', formData: formData}, function optionalCallback(err, httpResponse, body) {
     
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload message successful! Server responded with:', body);
    });     
}

class MessageManager {

    constructor(){}
  
  sendSMS(feAssigned, res) {
    console.log("inside fe assigned function  inside machine manager");
    return fSendSMS(feAssigned, res)   
  }
}

module.exports = MessageManager;
  