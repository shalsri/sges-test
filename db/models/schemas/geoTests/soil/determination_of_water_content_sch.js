'use strict';

const mongoose = require('mongoose');

var DeterminationOfMoistureContentSchema = new mongoose.Schema({

    geoTestId                     : String,

    methodOfTestAdopted           : String,
    timeOfInsertionInOven         : Number,
    timeOfRemovalFromOven         : Number,

    cupNumber                     : String,
    weight_of_cup_W1              : Number,   //in grams
    weight_of_wet_soil_and_cup_W2 : Number,   //in grams
    weight_of_dry_soil_and_cup_W3 : Number,   //in grams
    water_content_W               : Number,   //in percentage
    
});

module.exports = mongoose.model('DeterminationOfMoistureContent', DeterminationOfMoistureContentSchema);
