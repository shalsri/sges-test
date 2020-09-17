/*
    Array of json objects containing info abt the tests
*/

'use strict'

var testInfo1 = [];

var testTypes = require('../config/testType');

let func1 = function inittestInfo(){
       
    console.log("inited test table")
      
    var testInfo = [];

    //moisture content
    testInfo.push(
        { 
            "trials"      : 1, 
            "displayName" : "Determination Of Water Content",
            "standardName": "IS 2720-Part-II:1973", 
            "cost"        : 0
        })    

    //specific gravity
    testInfo.push(
        { 
            "trials"      : 2, 
            "displayName" : "Determination Of Specific Gravity",
            "standardName": "IS 2720-Part-III:1980(Reaffirmed-2011", 
            "cost"        : 0
        })
            
    //Atterberg's limit
    testInfo.push(
        { 
            "trials"      : 5, 
            "displayName" : "Determination of Liquid Limit and Plastic Limit", 
            "standardName": "IS 2720-PART-V:1985", 
            "cost"        : 0
        })
        
    //Grain size analysis
    testInfo.push(
        { 
            "trials"      : 3, 
            "displayName" : "Grain size analysis-Hydrometer Method", 
            "standardName": "IS 2720-PART-V:1985", 
            "cost"        : 0
        })
            
     //Direct shear
    testInfo.push(
        { 
            "trials"      : 15, 
            "displayName" : "Direct Shear Test",
            "standardName": "IS 2720-PART-XIII:1986(Reaffirmed-2015)", 
            "cost"        : 0
        })
            
    //Shrinkage Factors
    testInfo.push(
        { 
            "trials"      : 10, 
            "displayName" : "Determination Of Shrinkage Factors",
            "standardName": "IS 2720-PART-VI:1972(Reaffirmed-2011)", 
            "cost"        : 0
        })

    //Point load strength of rocks
    testInfo.push(
        { 
            "trials"      : 5,
            "displayName" : "Method Of Determination Of Point Load Strength Index Of Rocks", 
            "standardName": "IS 8764:1998(Reaffirmed-2008)", 
            "cost"        : 0
        })

    //Specific gravity method-II
    testInfo.push(
        { 
            "trials"      : 4,
            "displayName" : "Determination Of Specific Gravity And Water Absorption Method II-Aggregates smaller than 10mm", 
            "standardName": "IS 2386 Part-III:1963(Reaffirmed-2016)",
            "cost"        : 0
        })

    //Porosity density
    testInfo.push(
        { 
            "trials"      : 1,
            "displayName" : "Method of Test For Laboratory Determination Of Water Content Porosity Density and Related Properties of Rock Materials", 
            "standardName": "IS 13030:1991(Reaffirmed-2010)", 
            "cost"        : 0
        })

    //Poisson ratio
    testInfo.push(
        { 
            "trials"      : 7, 
            "displayName" : "Determination Of Modulus Of Elasticity And Poisson Ratio of Rock Materials in Uniaxial Compression", 
            "standardName": "IS 9221:1997(Reaffirmed-2010)",
            "cost"        : 0
        })     
        
    console.log("***********",testInfo[testTypes.METHOD_OF_DETERMINATION_OF_POINT_LOAD_STRENGTH_INDEX_OF_ROCKS].trials);    
    testInfo1 = testInfo;
}

let func2 =  function getTestType(tsMt){

    console.log("inside getTestType function", typeof(tsMt));

    console.log("************************************************************", testInfo1[testTypes.DETERMINATION_OF_SPECIFIC_GRAVITY].trials);
    var tstMthd = parseInt(tsMt);
    // console.log("inside getTestType function $$$$$$$$$$$$$$$$", testTrials, testTypes.DETERMINATION_OF_LIQUID_LIMIT_AND_PLASTIC_LIMIT);
    console.log("************************************************************",parseInt(tsMt));
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! print ",testInfo1[tstMthd].trials);

    var testTrials = testInfo1[tstMthd].trials;
    return testTrials;
}
    
module.exports.func1 = func1;
module.exports.func2 = func2;



