'use strict'

var TestDB = require('../../../db/models/geoTests/common/testDB');
var testDB = new TestDB();

var DeterminationOfAtterbergLimitsDB = require('../../../db/models/geoTests/soil/determination_of_atterberg_limitsDB');
var determinationofatterberglimitsDB = new DeterminationOfAtterbergLimitsDB();

var DeterminationOfAtterbergLimitsResult = require ('../../../db/models/geoTests/results/determination_of_atterberg_resultsDB');
var determinationofatterberglimitsresult = new DeterminationOfAtterbergLimitsResult ();

var moisture_content = require('../../common/generic/moisture_content_func');

// async function for updating values of a particular test
async function pUpdateTestEntry(geoTestId,method_used,history_of_soil_sample,period_of_soaking_soil_sample_before_testing,trialSelected,
    number_of_blows_N,cup_number_ll,weight_of_the_cup_ll,weight_of_wet_soil_cup_ll,weight_of_dry_soil_cup_ll,cup_number_pl,
    weight_of_the_cup_pl,weight_of_wet_soil_cup_pl,weight_of_dry_soil_cup_pl)
{

    console.log("in async func pUpdateTestEntry in DeterminationOfAtterbergLimits controller.js");

    let water_content_ll = await moisture_content( weight_of_the_cup_ll, weight_of_wet_soil_cup_ll, weight_of_dry_soil_cup_ll);
    let water_content_pl = await moisture_content( weight_of_the_cup_pl, weight_of_wet_soil_cup_pl, weight_of_dry_soil_cup_pl);
    
    console.log("Print water content Liquid Limit in controller", water_content_ll,water_content_pl);
    
    let result = await determinationofatterberglimitsDB.updateEntry(geoTestId,method_used,history_of_soil_sample,
        period_of_soaking_soil_sample_before_testing,trialSelected,number_of_blows_N,cup_number_ll,weight_of_the_cup_ll,
        weight_of_wet_soil_cup_ll,weight_of_dry_soil_cup_ll,water_content_ll,cup_number_pl,weight_of_the_cup_pl,weight_of_wet_soil_cup_pl,
        weight_of_dry_soil_cup_pl,water_content_pl)
        

    console.log("Result",result);
    
    return result;
}

function atterbergCalculation(trialValues){
    console.log("Trial values inside atterberg calcuation",trialValues,trialValues.x.length);
    let N       = trialValues.x.length ;
    let i       = 0;
    var x       = [];
    var xy      = [];
    var x_2     = [];
    var y_2     = [];
    var sum_x   = 0;
    var sum_y   = 0;
    var sum_xy  = 0;
    var sum_x_2 = 0;
    var sum_y_2 = 0;

    for(i=0;i<N;i++){
        x[i]   = Math.log10(trialValues.x[i]);
        xy[i]  = x[i]*trialValues.y[i];
        x_2[i] = x[i]*x[i];
        y_2[i] = trialValues.y[i]*trialValues.y[i];

        console.log("x,y,xy,x2,y2",x[i],trialValues.y[i],xy[i],x_2[i],y_2[i]);

        sum_x += x[i];
        sum_y += trialValues.y[i] ;
        sum_xy += xy[i];
        sum_x_2 += x_2[i];
        sum_y_2 += y_2[i];
    }

    console.log("Sum of x,y,xy,x2,y2",sum_x,sum_y,sum_xy,sum_x_2,sum_y_2);

    var normal_eq_slope_m          = ((sum_y_2*sum_x) -(sum_xy*sum_y))/((sum_xy*sum_x)-(sum_x_2*sum_y));

    var normal_eq_intercept_c      = (sum_y_2-normal_eq_slope_m*sum_xy)/sum_y ;

    var lin_regression_slope_m     = (N*sum_xy-sum_x*sum_y)/(N*sum_x_2-Math.pow(sum_x,2));

    var lin_regression_intercept_c = (sum_y-lin_regression_slope_m*sum_x)/N;

    var liquid_limit               = ((normal_eq_slope_m * Math.log10(25) + normal_eq_intercept_c) + (lin_regression_slope_m*Math.log10(25) + lin_regression_intercept_c))/2; 

    var plastic_limit   = 16 ; //dummy value
    var plasticity_index = liquid_limit - plastic_limit ;
    console.log("The results are :",normal_eq_slope_m,normal_eq_intercept_c,lin_regression_slope_m,lin_regression_intercept_c,liquid_limit,
                                    plastic_limit,plasticity_index);
    let atterberg_result = {
        "liquid_limit"                : Math.round(liquid_limit),
        "plastic_limit"               : Math.round(plastic_limit),
        "plasticity_index"            : Math.round(plasticity_index)
    }
    console.log("Atterberg result object in Atterberg Result",atterberg_result);
    return atterberg_result;
    
}

async function pGetTestResults(testId){
    console.log("Inside async function pGetTestResults of Atterberg Controller");

    //get the geotests id for the given testId
    let testResult = await testDB.getOneTest(testId);
    console.log("Test Result",testResult);
    console.log("unique test id is:",testResult[0].uniqueTestId);

    let  selectedTrials = testResult[0].geoTestId ;
    console.log("Selected trials",selectedTrials);
    
    var trialValues ={
        "x" :[],
        "y" :[]
    };

    //Using the geoTest ids, extract the respective No_of_blows and water_content . Pass the values to the Atterberg Calculation function.
    let no_of_trials = selectedTrials.length ;
    console.log("No of trials",no_of_trials);
    let i = 0;
    for(i=0;i<no_of_trials;i++){
        console.log("Inside for loop for getting x and y values");
        console.log("selected Trial",selectedTrials[i]);
        let trialResult = await determinationofatterberglimitsDB.getOneEntry(selectedTrials[i]);
        console.log("Trial Result",trialResult);
        trialValues.x.push(trialResult[0].number_of_blows_N);
        trialValues.y.push(trialResult[0].water_content_ll);
    }

    console.log("trial values before sending for calculation",trialValues);
    let att_result = await atterbergCalculation(trialValues);
    console.log("Atterberg result",testId,att_result.liquid_limit,att_result.plastic_limit,att_result.plasticity_index);
    let updateResult = await determinationofatterberglimitsresult.createResultEntry(testId,att_result.liquid_limit,att_result.plastic_limit,att_result.plasticity_index);
    console.log(updateResult);
    return(att_result);
}


// async function for updating values of all the trials of Atterberg test
/*async function pUpdateTrialValues(testValues){
    console.log("Inside async function pUpdate trial - Atterberg Controller ");
    console.log("Test values",testValues.length,testValues);
    let i = 0;
    var trialValues = {
        "x":[],
        "y":[]
    };
    for(i=0;i<testValues.length;i++){
        let water_content_ll = await moisture_content( testValues[i].weight_of_the_cup_ll,testValues[i].weight_of_wet_soil_cup_ll,
            testValues[i].weight_of_dry_soil_cup_ll);
        let water_content_pl = await moisture_content( testValues[i].weight_of_the_cup_pl,testValues[i].weight_of_wet_soil_cup_pl,
            testValues[i].weight_of_dry_soil_cup_pl);
        let result = await determinationofatterberglimitsDB.updateEntry(testValues[i].geoTestId,testValues[i].method_used,
                     testValues[i].history_of_soil_sample,testValues[i].period_of_soaking_soil_sample_before_testing,testValues[i].trialSelected,
                     testValues[i].number_of_blows_N,testValues[i].cup_number_ll,testValues[i].weight_of_the_cup_ll,
                     testValues[i].weight_of_wet_soil_cup_ll,testValues[i].weight_of_dry_soil_cup_ll,water_content_ll,testValues[i].cup_number_pl,
                     testValues[i].weight_of_the_cup_pl,testValues[i].weight_of_wet_soil_cup_pl,testValues[i].weight_of_dry_soil_cup_pl,water_content_pl);
        console.log("Result",result);
        if(testValues[i].trialSelected===true){
            trialValues.x.push(testValues[i].number_of_blows_N);
            trialValues.y.push(parseFloat(water_content_ll));
        }
    }
    console.log("Sending Dummy values for Atterberg Calculation");
    trialValues = {
        "N" : 3,
        "x" : [16,23,27],
        "y" : [42.51396,40.43285,40.15915],
        
    };
    console.log("Trial values",trialValues);
    let atterberg_result = await atterbergCalculation(trialValues);
    console.log("Calculation completed. The results are :",atterberg_result);
}*/

//func to get one test details
async function pGetOneTest(geoTestId){
     
    console.log("in get one test async function in Atterberg Controller.js");
    console.log("print geoTestId in controller", geoTestId);
    
    var result = await determinationofatterberglimitsDB.getOneEntry(geoTestId);
    console.log("printing result", result);
    console.log("Result first para",result[0].geoTestId,result[0].cup_number_ll);

    var resultObj =
    {
        "geoTestId"                                    : result[0].geoTestId,
        "method_used"                                  : result[0].method_used,
        "history_of_soil_sample"                       : result[0].history_of_soil_sample,
        "period_of_soaking_soil_sample_before_testing" : result[0].period_of_soaking_soil_sample_before_testing,
        "number_of_blows_N"                            : result[0].number_of_blows_N,
        "cup_number_ll"                                : result[0].cup_number_ll,
        "weight_of_the_cup_ll"                         : result[0].weight_of_the_cup_ll,
        "weight_of_wet_soil_cup_ll"                    : result[0].weight_of_wet_soil_cup_ll,
        "weight_of_dry_soil_cup_ll"                    : result[0].weight_of_dry_soil_cup_ll,
        "water_content_ll"                             : result[0].water_content_ll,
        "cup_number_pl"                                : result[0].cup_number_pl,
        "weight_of_the_cup_pl"                         : result[0].weight_of_the_cup_pl,
        "weight_of_wet_soil_cup_pl"                    : result[0].weight_of_wet_soil_cup_pl,
        "weight_of_dry_soil_cup_pl"                    : result[0].weight_of_dry_soil_cup_pl,
        "water_content_pl"                             : result[0].water_content_pl,
        "liquid_limit_LL"                              : result[0].liquid_limit_LL,
        "plastic_limit_PL"                             : result[0].plastic_limit_PL,
        "plasticity_index_IP"                          : result[0].plasticity_index_IP,
        //"group-symbol"                               : result[0].groupsymbol
    }
    console.log("*************test obj", resultObj)
    return resultObj;
}

class DeterminationOfAttbergLimits{

    constructor(){}

    //update one test entry
    updateTestEntry(geoTestId,method_used,history_of_soil_sample,period_of_soaking_soil_sample_before_testing,trialSelected,number_of_blows_N,cup_number_ll,weight_of_the_cup_ll,
        weight_of_wet_soil_cup_ll,weight_of_dry_soil_cup_ll,cup_number_pl,weight_of_the_cup_pl,weight_of_wet_soil_cup_pl,weight_of_dry_soil_cup_pl)
    {

        console.log("inside update test entry function in Atterberg Limits controller.js");

        return pUpdateTestEntry(geoTestId,method_used,history_of_soil_sample,period_of_soaking_soil_sample_before_testing,trialSelected,number_of_blows_N,cup_number_ll,weight_of_the_cup_ll,
            weight_of_wet_soil_cup_ll,weight_of_dry_soil_cup_ll,cup_number_pl,weight_of_the_cup_pl,weight_of_wet_soil_cup_pl,weight_of_dry_soil_cup_pl)
    
    }

    // updateTrialValues(testValues){

    //     console.log("Inside updateTrialValues function of Atterberg Limits Controller");

    //     return pUpdateTrialValues(testValues);

    // }

    //get the test result for complete Atterberg Test
    getTestResults(testId){

        console.log("Inside getTestResult function of Atterberg Limits controller");

        return pGetTestResults(testId);
    }

    //get all tests
    getAllTests(){

        console.log("inside get all tests in Atterberg controller");

        return new Promise((resolve, reject)=>{

            determinationofatterberglimitsDB.getAllTests()
            .then(response => resolve(response))
            .catch(err => reject(err));
        });    
    }

    // get one particular test
    getOneTest(geoTestId){

        console.log("inside get one test func in Attberg controller");
        
        return pGetOneTest(geoTestId);
    }

    deleteTest(geoTestId){

        console.log("inside delete one test func in Atterberg controller");
        
        return new Promise((resolve, reject)=>{

            determinationofatterberglimitsDB.deleteTest(geoTestId)
            .then(response => resolve(response))
            .catch(err => reject(err));
        });   
    }

}

module.exports = DeterminationOfAttbergLimits;