'use strict';

const mongoose = require('mongoose');  //calling the module

var DeterminationofSpecificGravityResultSchema = new mongoose.Schema({ //Assigning the variable

    //Parameters definition with data types
    geoTestIdSelected                        : [String],
    testId                                   : String,
    testSelected                             : Boolean,
    uniqueResultId                           : String,

    avg_corrected_specific_gravity_G_at_T_27 : Number,   
});

module.exports = mongoose.model('DeterminationOfSpecificGravityResult',DeterminationofSpecificGravityResultSchema); //Exporting the module

