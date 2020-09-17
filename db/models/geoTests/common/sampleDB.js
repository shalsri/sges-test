'use strict'

const Sample = require('../../schemas/geoTests/common/sampleSchema');
const shortid = require('shortid');

class SampleDB{

    constructor(){}

    createSampleEntry(pId, sId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq){

        return new Promise((resolve, reject) =>{

            console.log("inside create sample func in sampleDB.js");
            var genSampleId = shortid.generate()
            console.log("printing the generated sample id", genSampleId);

            var sampleEntry =  new Sample({
            
                projectId      : pId,
                uniqueSampleId : genSampleId,
            
                sampleId      : sId,
                sampleWeight  : sWt,
                sampleType    : sType,
                sampleImageId : sImgId,
            
                dateOfSampleArrival: dateOfArr,
                dateOfSampleLogging: dateOfLog,
            
                sampleStatus : sStatus                
            });
            
            sampleEntry
            .save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })       
    };  

    
    getAllSamples(){
        return new Promise((resolve, reject)=>{       
            Sample.find().exec()
            .then(response => resolve(response))
            .catch(err => reject(err))

        });
    }

    getSamplesInProject(pId){

        console.log("inside get samples in proj func in sampledb", pId)

        return new Promise((resolve, reject)=>{       
            Sample.find({"projectId":pId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });
    }

    getOneSample(sId){
        
        console.log("inside get one sample func in sampledb", sId)

        return new Promise((resolve, reject)=>{       
            Sample.find({"uniqueSampleId":sId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });
    }  
    
    updateSampleEntry(pId, sId, uniqueSampleId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq){

        console.log("inside update samples function");
        // console.log("Print params inside update sample", pId, sId, uniqueSampleId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq);

        return new Promise((resolve, reject)=>{
            
            Sample.updateOne(

            {uniqueSampleId:uniqueSampleId},

            {$set: 
                { 
                    projectId    : pId,
                    sampleId     : sId,
            
                    sampleWeight : sWt,
                    sampleType   : sType,
                    sampleImageId: sImgId,
                
                    dateOfSampleArrival: dateOfArr,
                    dateOfSampleLogging: dateOfLog,
                
                    sampleStatus : sStatus,                   
                    testSequence : testSeq
                }
            })
            .then(response => resolve(response))
            .catch(err => reject(err));
        });   
    };

    deleteSampleEntry(){}
    // associateTest(){}

}

module.exports =  SampleDB;