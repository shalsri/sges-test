'use strict';

const mongoose = require('mongoose');  //calling the module

var DeterminationofSpecificGravitySchema = new mongoose.Schema({ //Assigning the variable

    //Parameters definition with data types
    geoTestId                       : String,

    type_of_liquid_used             : String,
    specific_gravity_of_liquid      : Number, //If liquid is other than distilled water
    time_during_test                : Number,
    temperature_during_test_T       : Number, //In Centigrade     

    density_bottle_Number                         : Number,
    weight_of_densitybottle_M1                    : Number,   //in grams
    weight_of_dry_soil_and_densitybottle_M2       : Number,   //in grams
    weight_of_dry_soil_water_and_densitybottle_M3 : Number,   //in grams
    weight_of_densitybottle_and_water_M4          : Number,   //in grams
    K_value                                       : Number,
    specific_gravity_G_at_T                       : Number,   
    corrected_specific_gravity_G_at_T_27          : Number,   
    testSelected                                  : Boolean 

});

module.exports = mongoose.model('DeterminationOfSpecificGravity', DeterminationofSpecificGravitySchema); //Exporting the module

