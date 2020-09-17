'use strict'

//Calling the module
var specific_gravity_kval = require('../../../common/generic/specific_gravity_kval_func');
// var DeterminationofSpecificGravityResultSchema = require('../../db/models/schemas/geoTests/results/determination_of_specific_gravity_result_sch')

var DeterminationOfSpecificGravityDB = require('../../../db/models/geoTests/soil/determination_of_specific_gravityDB');
var determinationofspecificgravityDB = new DeterminationOfSpecificGravityDB();


//To calculate specific gravity
function specificGravity(M1, M2, M3, M4) {

    console.log("inside specific gravity func", M1, M2, M3, M4);

    var weight_of_densitybottle_M1                      = M1;
    var weight_of_dry_soil_and_densitybottle_M2         = M2;
    var weight_of_dry_soil_water_and_densitybottle_M3   = M3;
    var weight_of_densitybottle_and_water_M4            = M4;
    var specificGravityG;

    specificGravityG = (weight_of_dry_soil_and_densitybottle_M2 - weight_of_densitybottle_M1) / 
                        ((weight_of_densitybottle_and_water_M4 - weight_of_densitybottle_M1)-(weight_of_dry_soil_water_and_densitybottle_M3 - weight_of_dry_soil_and_densitybottle_M2));    

    console.log("Specific Gravity is :", specificGravityG.toFixed(2));

    return specificGravityG;
}

 //To calculate corrected specific gravity
 function correctedSpecificGravity(specific_gravity_kval, specific_gravity){

    console.log("Inside corrected specific gravity func", specific_gravity_kval, specific_gravity)

    var correctedspecificgravity_G;

    correctedspecificgravity_G = specific_gravity_kval * specific_gravity;

    console.log("Corrected specific gravity is:", correctedspecificgravity_G.toFixed(2));

    return correctedspecificgravity_G;
}

//Async-Await function
async function pUpdateTestEntry(gTstId, type_of_liquid_used, specific_gravity_of_liquid, time_during_test, 
                                temperature_during_test_T, density_bottle_Number, weight_of_densitybottle_M1, 
                                weight_of_dry_soil_and_densitybottle_M2, weight_of_dry_soil_water_and_densitybottle_M3, 
                                weight_of_densitybottle_and_water_M4, testVideoId){
    
    console.log("in async func pUpdateTestEntry in DeterminationOfSpecificGravity controller.js");         
    
    var specific_gravity_G = await specificGravity(weight_of_densitybottle_M1, weight_of_dry_soil_and_densitybottle_M2, weight_of_dry_soil_water_and_densitybottle_M3, weight_of_densitybottle_and_water_M4);
    
    console.log("print specific_gravity determined in controller", specific_gravity_G);

    //To calculate K-Value for the given temperature
    var kvalue = await specific_gravity_kval(temperature_during_test_T) 
    
    console.log("print k value determined in controller", kvalue);
   
    var corr_spec_grav_g = await correctedSpecificGravity(kvalue, specific_gravity_G) 
   
    console.log("print corrected specific_gravity_G determined in controller", corr_spec_grav_g);

    //Assigning to result the parameters with calculated values
    let result = await determinationofspecificgravityDB.updateEntry(gTstId, type_of_liquid_used, specific_gravity_of_liquid, 
                                                                     time_during_test, temperature_during_test_T,
                                                                     density_bottle_Number, weight_of_densitybottle_M1, 
                                                                     weight_of_dry_soil_and_densitybottle_M2,
                                                                     weight_of_dry_soil_water_and_densitybottle_M3,
                                                                     weight_of_densitybottle_and_water_M4, kvalue, 
                                                                     specific_gravity_G, corr_spec_grav_g, testVideoId)
    
    Promise.resolve(result);
}

class DeterminationOfSpecificGravity{

    constructor(){}

    updateTestEntry(gTstId, type_of_liquid_used, specific_gravity_of_liquid, time_during_test, temperature_during_test_T,
                    density_bottle_Number, weight_of_densitybottle_M1, weight_of_dry_soil_and_densitybottle_M2,
                    weight_of_dry_soil_water_and_densitybottle_M3, weight_of_densitybottle_and_water_M4, testVideoId){

    console.log("inside update test entry function in specific gravity db.js");

    return pUpdateTestEntry(gTstId, type_of_liquid_used, specific_gravity_of_liquid, time_during_test, 
                            temperature_during_test_T, density_bottle_Number, weight_of_densitybottle_M1,
                            weight_of_dry_soil_and_densitybottle_M2, weight_of_dry_soil_water_and_densitybottle_M3,
                            weight_of_densitybottle_and_water_M4, testVideoId);
    }

    updateTrialValues(testValues){

        console.log("Inside updateTrialValues function of Specific Controller");

        return pUpdateTrialValues(testValues);

    }    

    getOneSpecificTest(geoTestId, res){

        console.log("inside get one specific test specific gravity controller ");

        return new Promise((resolve, reject)=>{

            determinationofspecificgravityDB.getOneEntry(geoTestId)
            .then(response => resolve(response))
            .catch(err => reject(ErrorEvent))           
        });        
    }
}

//Exporting the module
module.exports = DeterminationOfSpecificGravity;
