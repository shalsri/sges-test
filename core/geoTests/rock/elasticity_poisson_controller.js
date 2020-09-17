'use strict'

var TestDB = require('../db/models/geoTests/common/testDB');
var testDB = new TestDB();

var ModulusOfElasticityAndPoissonRatioDB = require('../db/models/geoTests/rock/elasticity_poissonDB');
var modulusofelasticityandpoissonRatioDB = new ModulusOfElasticityAndPoissonRatioDB();

async function pInitTest(tCardNo){

    console.log("inside async func pInitTest");

    var res = {}
    var testId = await testDB.createEntry(tCardNo);
    var sarathyGeoId = await modulusofelasticityandpoissonRatioDB.createEntry(tCardNo);

    console.log("Print testid", testId._id);
    console.log("Print sgesId", sarathyGeoId._id);

    var tId    = testId._id;
    var sgesId = sarathyGeoId._id;
    await testDB.updateTestId(tId, sgesId);

    res = {

        "testId"    : tId,
        "sgesTestId":sgesId
    }

    return res;
}

async function pUpdateTestEntry(tId, dDia, dArea, dLen, sgesId){

    console.log("inside update test entry async func");

    var result = await modulusofelasticityandpoissonRatioDB.updateDimensionsEntry(tId, dDia, dArea, dLen, sgesId);
    return result;

}

class TestController{
    constructor(){}

    initTest(tCardNo){

        console.log("inside init test in test controller");

        return pInitTest(tCardNo);           
    }

   updateTestEntry(tId, dDia, dArea, dLen, sgesId){

       console.log("inside update test entry func in test controller");
       return pUpdateTestEntry(tId, dDia, dArea, dLen, sgesId);
    }

   getAllTests(){
       console.log("inside get all tests in test controller");

        return new Promise((resolve, reject)=>{
            testDB.getAllTests()
            .then(response => resolve(response))
            .catch(err => reject(err));
        });    
    }
}

module.exports = TestController;