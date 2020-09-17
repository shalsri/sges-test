'use strict'

const Test = require('../../schemas/geoTests/common/testSchema');
const shortid = require('shortid');

class TestDB{

    constructor(){}

    createTestEntry(tCardNo, tstMethod, tstStd, labTmp, labHumidity, tstCrtTime, tstSstTime, tstEndTime, sId, tstStatus){
        
        console.log("inside create test entry func");

        var gentestId = shortid.generate()
        console.log("printing the generated sample id", gentestId, tstStatus);

        return new Promise((resolve, reject) =>{

            console.log("inside create test func in testDb.js");

            var testEntry =  new Test({

                uniqueTestId     : gentestId,

                testCardNumber   : tCardNo,                
                testMethod       : tstMethod,
                testingStandard  : tstStd,                            
              
                labTemperature   : labTmp,            
                labHumidity      : labHumidity,      
                      
                testCreationTime : tstCrtTime,
                testStartTime    : tstSstTime,
                testEndTime      : tstEndTime,

                sampleId         : sId,
                testStatus       : tstStatus                
            });
            
            testEntry.save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })       
    };

    updateTestEntry(uniqueTestId, tCardNo, tstMethod, tstStd, sId, labTmp, 
                                      labHumidity,  gTstId, gTstIdSelect, tstCrtTime, tstSstTime,
                                      tstEndTime, testVideoId,  tstStatus){
   
        console.log("update params,", uniqueTestId,tCardNo, tstMethod, tstStd, sId, labTmp, 
                                      labHumidity, gTstId, gTstIdSelect, tstCrtTime, tstSstTime, 
                                      tstEndTime, testVideoId, tstStatus)

                                    
        return new Promise((resolve, reject)=>{

            Test.updateOne({uniqueTestId: uniqueTestId},
            {$set: 
                { 
                    testCardNumber   : tCardNo,                
                    testMethod       : tstMethod,
                    testingStandard  : tstStd,

                    sampleId         : sId,
                    labTemperature   : labTmp,    
                    labHumidity      : labHumidity,    
                    geoTestId        : gTstId,
                    geoTestIdSelected: gTstIdSelect,
                    
                    testCreationTime : tstCrtTime,
                    testStartTime    : tstSstTime,
                    testEndTime      : tstEndTime,

                    testVideoId      : testVideoId,
                    testStatus       : tstStatus 
                }
            })
            .then(response => {
                resolve(response)
                console.log("response", response)
            })
            .catch(err => reject(err));
        });   
    };

    getAllTests(){
        return new Promise((resolve, reject)=>{       
            Test.find().exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });
    }

    getOneTest(uniqueTestId){

        console.log("inside get one test route");

        return new Promise((resolve, reject)=>{       
            Test.find({"uniqueTestId":uniqueTestId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });    
    }

    getAllTestsForSample(samId){

        console.log("inside get all tests for sample route");

        return new Promise((resolve, reject)=>{       
            Test.find({"sampleId":samId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });    
}

    deleteEntry(uniqueTestId){

        console.log("inside delete entry in testDB.js");

        return new Promise((resolve, reject)=>{       
            Test.deleteOne({"uniqueTestId":uniqueTestId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        }); 
    }
    associateTest(){}

}

module.exports =  TestDB;