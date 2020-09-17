'use strict'

const Determination_of_atterberg_limits = require('../../schemas/geoTests/soil/determination_of_atterberg_limits_sch');

//using the atterberg limits result schema model
const Atterberg_Result = require('../../schemas/geoTests/results/atterberg_limits_result_schema');

class DeterminationOfAtterbergLimits{

    constructor(){}

    // to create an Atterberg Limits test entry using the test genTestId
    createEntry(genGeoTestId){

        console.log("inside create entry func in atterberg limitsdb.js, genGeotestId", genGeoTestId);        

        return new Promise((resolve, reject) => {

            var atterbergLimits = new Determination_of_atterberg_limits({
                geoTestId : genGeoTestId            
            })           
            
            atterbergLimits.save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })     
    } 
    
    // updating the Atterberg limits test values. Before the first update, the Atterberg test entry will only have the genTestId paramter
    updateEntry(geoTestId,method_used,history_of_soil_sample,period_of_soaking_soil_sample_before_testing,trialSelected,number_of_blows_N,
                cup_number_ll,weight_of_the_cup_ll,weight_of_wet_soil_cup_ll,weight_of_dry_soil_cup_ll,water_content_ll,cup_number_pl,
                weight_of_the_cup_pl,weight_of_wet_soil_cup_pl,weight_of_dry_soil_cup_pl,water_content_pl){

        console.log("inside update entry func in atterberg limits db.js");

        return new Promise((resolve, reject)=>{

            Determination_of_atterberg_limits.updateOne({geoTestId:geoTestId}, // updating values in the database
            {$set:
                {
                     geoTestId                                    : geoTestId,
                     method_used                                  : method_used,
                     history_of_soil_sample                       : history_of_soil_sample,
                     period_of_soaking_soil_sample_before_testing : period_of_soaking_soil_sample_before_testing,
                     trialSelected                                : trialSelected,

                     number_of_blows_N                            : number_of_blows_N,
                     cup_number_ll                                : cup_number_ll,
                     weight_of_the_cup_ll                         : weight_of_the_cup_ll,
                     weight_of_wet_soil_cup_ll                    : weight_of_wet_soil_cup_ll,
                     weight_of_dry_soil_cup_ll                    : weight_of_dry_soil_cup_ll,
                     water_content_ll                             : water_content_ll,

                     cup_number_pl                                : cup_number_pl,
                     weight_of_the_cup_pl                         : weight_of_the_cup_pl,
                     weight_of_wet_soil_cup_pl                    : weight_of_wet_soil_cup_pl,
                     weight_of_dry_soil_cup_pl                    : weight_of_dry_soil_cup_pl,
                     water_content_pl                             : water_content_pl,

                }
            })
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
    }

    // to get all the registered Atterberg Limits tests
    getAllTests(){

        console.log("Inside getAllTests in Atterberg DB");
        return new Promise((resolve, reject)=>{       
            Determination_of_atterberg_limits.find().exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });
    }

    // to get a particular Atterberg  Limits test
    getOneEntry(geoTstId){

        console.log("inside the get one test in atterberg limits db", geoTstId);

        return new Promise((resolve, reject)=>{ 

            Determination_of_atterberg_limits.find({"geoTestId":geoTstId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });    

    }

    // to delete a particular Atterberg Limits test
    deleteTest(geoTestId){

        console.log("inside delete entry in AtterbergDB.js");

        return new Promise((resolve, reject)=>{       
            Determination_of_atterberg_limits.deleteOne({"geoTestId":geoTestId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        }); 
    }

}

module.exports = DeterminationOfAtterbergLimits;