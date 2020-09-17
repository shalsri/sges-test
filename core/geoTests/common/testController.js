'use strict'

const shortid = require('shortid');

var TestDB = require('../../../db/models/geoTests/common/testDB');
var testDB = new TestDB();

var Test = require('../../../db/models/schemas/geoTests/common/testSchema');

var DeterminationOfMoistureContentDB    = require('../../../db/models/geoTests/soil/determination_of_moisture_contentDB');
var determination_of_moisture_contentDB = new DeterminationOfMoistureContentDB();

var SampleDB = require('../../../db/models/geoTests/common/sampleDB');
var sampleDB = new SampleDB();

var DeterminationOfSpecificGravityDB    = require('../../../db/models/geoTests/soil/determination_of_specific_gravityDB');
var determination_of_specific_gravityDB = new DeterminationOfSpecificGravityDB();

var SpecifiGravityResultDB = require('../../../db/models/geoTests/results/determination_of_specific_gravity_resultDB');
var specifigravityresultDB = new SpecifiGravityResultDB();

var SpecificGravity = require('../../../db/models/schemas/geoTests/soil/determination_of_specific_gravity_sch');

// const inittestInfo = require('../../../config/testInfoTable')
var func2 = require('../../../config/testInfoTable').func2;

async function switchTestMethod(tstMt, genGeoTestId){

    console.log("inside the switch test method function", tstMt, genGeoTestId);

    switch(tstMt){
        
        case  0:
            console.log("Inside DETERMINATION_OF_WATER_CONTENT switchcase");
            await determination_of_moisture_contentDB.createEntry(genGeoTestId);
            break;
        
        case 1:     
            console.log("DETERMINATION_OF_SPECIFIC_GRAVITY switchcase");
            await determination_of_specific_gravityDB.createEntry(genGeoTestId);
            break;
        
        case 2:
            console.log("DETERMINATION_OF_LIQUID_LIMIT_AND_PLASTIC_LIMIT switchcase");
            break;

        default:
            console.log("Test not available");
    }
}

//func to create a test
async function pPlanTest(tCardNo, tstMethod, tstStd, labTmp, labHumidity, tstCrtTime, tstSstTime, tstEndTime, sId, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq, tstStatus){

    console.log("inside async func in pPlanTest testController.js", tstStatus, tstMethod);  
    
    //updating the generated geoTestId in testSchema
    var result = await testDB.createTestEntry(tCardNo, tstMethod, tstStd, labTmp, labHumidity, tstCrtTime, tstSstTime, tstEndTime, sId, tstStatus);

    console.log("print the test created", result.uniqueTestId);
    var uniqueTestId = result.uniqueTestId;
    
    //getting the number of trilas for the particular test
    console.log("print the getTestType", typeof(tstMethod)); 
    
    var tstMt = parseInt(tstMethod);

    var count = func2(tstMethod);

    console.log("print trial count", count);
    var genGeoTestId_arr = [];

    //loop and add as many geoTestids as the number of trials into the test as well as in specific test schema
        for(var i=0; i<count; i++){
        console.log("*******");
        
        var genGeoTestId = shortid.generate();
        console.log("printing the generated geotestId", genGeoTestId);  
        
        var gTstIdSelect = "";
        var testVideoId = "";
        
        genGeoTestId_arr.push(genGeoTestId)

        await switchTestMethod(tstMt, genGeoTestId);
    } 

    // await sampleDB.updateSampleEntry(pId, sId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq);
    
    //updating the generated geoTestId in testSchema
    var result1 = await testDB.updateTestEntry( uniqueTestId, tCardNo, tstMethod, tstStd, sId, labTmp, 
                                                labHumidity,  genGeoTestId_arr, gTstIdSelect, tstCrtTime, tstSstTime,
                                                tstEndTime, testVideoId,  tstStatus);

    Promise.resolve(result1);
}
    
//func to get one test details
async function pGetOneTest(uniqueTestId){

    var oneTest = {};
    var specificTestDetails = [];
     
    console.log("in get one test async function in testController.js");
    console.log("print uniqueTestId in controller", uniqueTestId);
    
    var result = await testDB.getOneTest(uniqueTestId);
    console.log("printing result and result length", result, result.length);
    // console.log("geotest id", result[0].testCardNumber);

    var tst_method = result[0].testMethod;
    var geoTstId   = result[0].geoTestId;

    console.log("Print geoTstId, length, testMethod", geoTstId.length);
    console.log("testMethod", tst_method);

    // var result1 = await determination_of_moisture_contentDB.getOneEntry(geoTstId);
    // console.log("print result1 of specific type of test", result1);   

    if(tst_method == 0){

        console.log("the test method in if is moisture content");

        for(var i=0; i < geoTstId.length;i++){

            var result1 = await determination_of_moisture_contentDB.getOneEntry(geoTstId);
            console.log("print result1 of specific type of test", result1);   
        }
    }

    else if(tst_method == 1){

        console.log("the test method in if is specific gravity content");

        for(var i=0; i < geoTstId.length;i++){

            result1 = await (determination_of_specific_gravityDB.getOneEntry(geoTstId[i]));
            console.log("print result1 specific gravity of test", result1);   
            specificTestDetails.push(result1)
        }
        console.log("print result of specific test", specificTestDetails);
    }   

    oneTest = {

        "testDetails" : result,
        "specificTest": specificTestDetails
    }

    return oneTest;
}

async function pGetTestResults(testId){

    console.log("in async func pGetTestResults in test controller");

    var test_result = {};
    var res_arr = [];

    //get the geoTestIdSelected from the generic testSchema
    var result = await Test.findOne({uniqueTestId: testId});
    console.log("print the test details", result.geoTestIdSelected);

    var gTstSelId = result.geoTestIdSelected;

    //get the count of the geoTestIdSlected array
    var count = gTstSelId.length;
    var corr_sg = [];

    console.log("gTstSelId.count", count);

    //loop through the length and get the details of each test for resulta and calulating the average specific gravity

    for (var i=0; i< count; i++){

        var result = await SpecificGravity.findOne({geoTestId: gTstSelId[i]})
        console.log("^^^^^^^^^^^^^^^^^^^^^^", result.corrected_specific_gravity_G_at_T_27);
        corr_sg.push(result.corrected_specific_gravity_G_at_T_27);
        res_arr.push(result);
    }
    // console.log("??????????????????????", corr_sg)

    var sum_corr_sg = (corr_sg[0] + corr_sg[1])/2;
    var avg_corr_sp_grav_g = sum_corr_sg.toFixed(2) 
    console.log("Average Corrected specific gravity is:", avg_corr_sp_grav_g);  

    console.log("print params", testId, avg_corr_sp_grav_g)
    var testResult = await specifigravityresultDB.createResultEntry(testId, gTstSelId, avg_corr_sp_grav_g);
    console.log("%%%%%%%%%%%%%%%%%%%%", testResult);

    test_result = {
        
        "testTrials": res_arr,
        "avg_sp_grt": avg_corr_sp_grav_g
    }

    return (test_result);
}

class TestController {

    constructor(){}

    //test init function
    planTest(tCardNo, tstMethod, tstStd, labTmp, labHumidity, tstCrtTime, tstSstTime, tstEndTime, sId, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq, tstStatus ){

        console.log("inside plan test in test controller", tstStatus);

        return pPlanTest(tCardNo, tstMethod, tstStd, labTmp, labHumidity, tstCrtTime, tstSstTime, tstEndTime, sId, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq, tstStatus);                    
    }

    //update the test
    updateTestEntry(uniqueTestId,tCardNo, tstMethod, tstStd, sId, labTmp, labHumidity, gTstId, gTstIdSelect, tstCrtTime, tstSstTime, tstEndTime, testVideoId,  tstStatus, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq){

        console.log("inside update test entry func in test controller", tstStatus);

        return new Promise((resolve, reject)=>{
            
            testDB.updateTestEntry(uniqueTestId,tCardNo, tstMethod, tstStd, sId, labTmp, labHumidity,  gTstId, gTstIdSelect, tstCrtTime, tstSstTime, tstEndTime, testVideoId,  tstStatus, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq)
            .then(response => resolve(response))
            .catch(err => reject(err));
        });    
    }

    //get all the tests
    getAllTests(){

        console.log("inside get all tests in test controller");

        return new Promise((resolve, reject)=>{

            testDB.getAllTests()
            .then(response => resolve(response))
            .catch(err => reject(err));
        });    
    }

    //get one particular test
    getOneTest(uniqueTestId){

        console.log("inside get one test func in test controller");
        
        return pGetOneTest(uniqueTestId);
    }

    getTestResults(testId){

        console.log("inside get test results func in test controller", testId);

        return pGetTestResults(testId);
    }

    getAllTestsForSample(samId){

        console.log("inside getAllTestsForSample func in test controller ");
        
        return new Promise((resolve, reject)=>{

            testDB.getAllTestsForSample(samId)
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
    }

    deleteOneTest(uniqueTestId){

        console.log("inside delete one test func in test controller ");
        
        return new Promise((resolve, reject)=>{

            testDB.deleteEntry(uniqueTestId)
            .then(response => resolve(response))
            .catch(err => reject(err));
        });    
    }
}

module.exports = TestController;