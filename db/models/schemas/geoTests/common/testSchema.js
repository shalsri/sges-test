'use strict';

const mongoose = require('mongoose');

var testSchema = new mongoose.Schema({

    testCardNumber   : String,
    testMethod       : String,
    testingStandard  : String,

    sampleId         : String,
    uniqueTestId     : String,
    
    labTemperature   : Number,      // in degree celsius
    labHumidity      : Number,      // in percentage
    geoTestId        : [String],
    geoTestIdSelected: [String],
   
    testCreationTime : Number,
    testStartTime    : Number,
    testEndTime      : Number,

    testVideoId      : String,
    testStatus       : String,
    
});

module.exports = mongoose.model('Test', testSchema);