'use strict';

const mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var userSchema = new mongoose.Schema({
  
   userName     : String,
   phoneNumber  : Number,
   role         : [String],
   projectId    : [String],
   uniqueUserId : String,
   local        : {
      email        : String,
      password     : String
                  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
   return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
