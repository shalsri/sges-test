'use strict'

const mongoose = require('mongoose');
var fOtpSchema = new mongoose.Schema
({
    emailId         : String,
    timestamp       : Number,
    fOtp            : Number,
    uniqueUserId    : String   
});

module.exports = mongoose.model('ForgotOtp', fOtpSchema);
