'use strict';

const mongoose = require('mongoose');

var modulusOfElasticityAndPoissonRatioSchema = new mongoose.Schema({

    dimensions:{
        diameter: Number,     // in mm
        area    : Number,     // in sq mm
        length  : Number,     // in mm
    },

    weight: Number,  //in grams
    
    LVDT:Number,

    Force: {
        I  : Number,
        II : Number,
        III: Number
    },   // in kN
    
    DiametricalDeformation: {
        DeltaD1: Number,
        DeltaD2: Number,
        DeltaD3: Number
    },   // in mm

    AxialStrainEpsilon:{
        I  : Number,
        II : Number,
        III: Number        
    },   // in percentage

    LateralStrain:{
        I  : Number,
        II : Number,
        III: Number        
    },   // in percentage
    
    StressSigmaD:{
        I  : Number,
        II : Number,
        III: Number        
    },   // in kPa

    Remarks: String,

    Result:{
        FailureStrainEpsilon: Number,   // in percentage
        FailureStressSigmaD : Number,   // in kPa
        YoungsModulusE      : Number,    
        TangentModulus      : Number,
        PoissonRatioY       : Number
    }
    
});

module.exports = mongoose.model('modulusOfElasticityAndPoissonRatio', modulusOfElasticityAndPoissonRatioSchema);