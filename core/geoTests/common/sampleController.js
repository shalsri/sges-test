'use strict'

var SampleDB = require('../../../db/models/geoTests/common/sampleDB');
var sampledb = new SampleDB();

var Sample = require('../../../db/models/schemas/geoTests/common/sampleSchema');

async function pGetTestIdsForSample(uniqueSampleId){
    
    var testIds;
    console.log("inside get testids for a sample async func");
    
    var result =  await Sample.find({uniqueSampleId: uniqueSampleId}).exec()
    console.log("print result", result);
    for(var sample=0; sample<result.length; sample++){

        console.log("print testids", result[sample].testSequence);  
        testIds = result[sample].testSequence;    
    } 

    console.log("************", testIds);

    return testIds

}

class SampleController {

    constructor(){}

    initSample(pId, sId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq){
        
        console.log("inside initSample in sampleController");

        return new Promise((resolve, reject)=>{

            sampledb.createSampleEntry(pId, sId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq)
            .then(response => resolve(response))
            .catch(err => reject(err));
        });
    }         
    
    getAllSamples(){

        console.log("inside get all samples in sample controller");
        return new Promise((resolve, reject)=>{

            sampledb.getAllSamples()
            .then(response => resolve(response))
            .catch(err => reject(err));
        });    
    }

    getSamplesForProject(pId){

        console.log("inside get getSamplesForProject in sample controller", pId);

        return new Promise((resolve, reject)=>{
            sampledb.getSamplesInProject(pId)
            .then(response => resolve(response))
            .catch(err => reject(err));
        });    
    } 
    
    getOneSample(sId){
        console.log("inside get one sample route", sId);

        return new Promise((resolve, reject) => {
            sampledb.getOneSample(sId)
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
    }   

    getTestIdsForSample(uniqueSampleId){

        console.log("inside getids for sample func in sample controller.js");

        return pGetTestIdsForSample(uniqueSampleId);
    }

    updateSample(pId, sId, uniqueSampleId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq){

        console.log("inside update sample entry route");

        return new Promise((resolve, reject) =>{
            
            sampledb.updateSampleEntry(pId, sId, uniqueSampleId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq)
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
    }            
}

module.exports = SampleController;