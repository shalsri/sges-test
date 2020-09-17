'use strict';

const mongoose = require('mongoose');

var DeterminationOfAtterbergLimits = new mongoose.Schema({

    geoTestId                                   : String,
    method_used                                 : String,
    history_of_soil_sample                      : String,
    period_of_soaking_soil_sample_before_testing: Number, // in minutes
    trialSelected                               : Boolean,

    number_of_blows_N                           : Number,
    cup_number_ll                               : String,
    weight_of_the_cup_ll                        : Number,
    weight_of_wet_soil_cup_ll                   : Number,
    weight_of_dry_soil_cup_ll                   : Number,
    water_content_ll                            : Number, // in percentage %

    cup_number_pl                               : String,
    weight_of_the_cup_pl                        : Number,
    weight_of_wet_soil_cup_pl                   : Number,
    weight_of_dry_soil_cup_pl                   : Number,
    water_content_pl                            : Number, // in percentage %


});

module.exports = mongoose.model('DeterminationOfAtterbergLimits', DeterminationOfAtterbergLimits);