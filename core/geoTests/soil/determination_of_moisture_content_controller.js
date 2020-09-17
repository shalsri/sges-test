'use strict'

var moisture_content = require('../../../common/generic/moisture_content_func');

var DeterminationOfMoistureContentDB = require('../../../db/models/geoTests/soil/determination_of_moisture_contentDB');
var determinationofmoisturecontentDB = new DeterminationOfMoistureContentDB();

async function pUpdateTestEntry(gTstId, methodOfTestAdopted, timeOfInsertionInOven, timeOfRemovalFromOven, cupNumber, weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3){

    console.log("in async func pUpdateTestEntry in DeterminationOfMoistureContent controller.js");

    var moisture_determined_W = await moisture_content( weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3)

    console.log("print moisture_determined_W in controller", moisture_determined_W);

    let result = await determinationofmoisturecontentDB.updateEntry(gTstId, methodOfTestAdopted, timeOfInsertionInOven, timeOfRemovalFromOven, cupNumber, weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3, moisture_determined_W)
    
    Promise.resolve(result);
}

class DeterminationOfMoistureContent{

    constructor(){}

    updateTestEntry(gTstId, methodOfTestAdopted, timeOfInsertionInOven, timeOfRemovalFromOven, cupNumber, weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3){

        console.log("inside update test entry function in moisture content db.js");

        return pUpdateTestEntry(gTstId, methodOfTestAdopted, timeOfInsertionInOven, timeOfRemovalFromOven, cupNumber, weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3)

    }

    getOneSpecificTest(geoTestId, res){

        console.log("inside get one specific test controller");

        return new Promise((resolve, reject)=>{

            determinationofmoisturecontentDB.getOneEntry(geoTestId)
            .then(response => resolve(response))
            .catch(err => reject(ErrorEvent))           
        });        
    }
}

module.exports = DeterminationOfMoistureContent;