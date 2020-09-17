'use strict'

const Determination_of_moisture_content = require('../../schemas/geoTests/soil/determination_of_water_content_sch');

class DeterminationOfMoistureContentDB {

    constructor(){}

    createEntry(genGeoTestId){

        console.log("inside create entry func in moisture contentdb.js, genGeotestId", genGeoTestId);        

        return new Promise((resolve, reject) => {

            var moistureContent = new Determination_of_moisture_content({

                geoTestId : genGeoTestId            
            })           
            
            moistureContent.save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })     
    }      
    
    updateEntry(gTstId, methodOfTestAdopted, timeOfInsertionInOven, timeOfRemovalFromOven, cupNumber, weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3, moisture_determined_W){

        console.log("inside update entry func in moisture content db.js");

        return new Promise((resolve, reject)=>{

            Determination_of_moisture_content.updateOne({geoTestId:gTstId},
            {$set:
                {
                    methodOfTestAdopted           : methodOfTestAdopted,
                    timeOfInsertionInOven         : timeOfInsertionInOven,
                    timeOfRemovalFromOven         : timeOfRemovalFromOven,
                
                    cupNumber                     : cupNumber,
                    weight_of_cup_W1              : weight_of_cup_W1,   
                    weight_of_wet_soil_and_cup_W2 : weight_of_wet_soil_and_cup_W2,   
                    weight_of_dry_soil_and_cup_W3 : weight_of_dry_soil_and_cup_W3,   
                    water_content_W               : moisture_determined_W
                }
            })
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
    }
    
    getOneEntry(geoTstId){

        console.log("inside the get one test in moisture content db", geoTstId);

        return new Promise((resolve, reject)=>{ 

            Determination_of_moisture_content.findOne({"geoTestId":geoTstId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });         
    }

    deleteOneEntry(geoTstId){

        console.log("inside delete one test entry function in moisture content db", geoTstId);

        return new Promise((resolve, reject) => {

            Determination_of_moisture_content.deleteOne({"geoTestId": geoTstId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        })
    }
}
module.exports = DeterminationOfMoistureContentDB;