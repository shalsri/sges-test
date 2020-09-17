'use strict';

const mongoose = require('mongoose');

var sampleSchema = new mongoose.Schema({

    projectId      : String,
    boreHoleId     : String,
    depthId        : String,
    uniqueSampleId : String,

    sampleId      : String,
    sampleWeight  : Number,
    sampleType    : String,
    sampleImageId : [String],

    dateOfSampleArrival: Number,
    dateOfSampleLogging: Number,

    sampleStatus: String,

    testSequence  : [String]

});

module.exports = mongoose.model('Sample', sampleSchema);