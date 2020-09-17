'use strict'

//Calling the module
const Determination_of_specific_gravity = require('../../schemas/geoTests/soil/determination_of_specific_gravity_sch');

//Class Declaration
class DeterminationOfSpecificGravityDB {

    constructor(){}

//Calling the function with parameters as arguments
    createEntry(genGeoTestId){

        console.log("inside create entry func in specific gravitydb.js, genGeotestId", genGeoTestId);        

        return new Promise((resolve, reject) => {

            var specificGravity = new Determination_of_specific_gravity({

                geoTestId : genGeoTestId            
            })           
        
            specificGravity.save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })     
    }  

//Calling the function with parameters as arguments
    updateEntry(gTstId, type_of_liquid_used, specific_gravity_of_liquid, time_during_test, temperature_during_test_T,
                density_bottle_Number, weight_of_densitybottle_M1, weight_of_dry_soil_and_densitybottle_M2,
                weight_of_dry_soil_water_and_densitybottle_M3, weight_of_densitybottle_and_water_M4, specific_gravity_G, specific_gravity_kval, corr_spec_grav_g){

        console.log("inside update entry func in specific gravity db.js");

        return new Promise((resolve, reject)=>{

            Determination_of_specific_gravity.updateOne({geoTestId:gTstId},
            {$set:
                {
                    type_of_liquid_used                             : type_of_liquid_used,
                    specific_gravity_of_liquid                      : specific_gravity_of_liquid,
                    time_during_test                                : time_during_test,
                    temperature_during_test_T                       : temperature_during_test_T,
                    density_bottle_Number                           : density_bottle_Number,
                    weight_of_densitybottle_M1                      : weight_of_densitybottle_M1,   
                    weight_of_dry_soil_and_densitybottle_M2         : weight_of_dry_soil_and_densitybottle_M2,   
                    weight_of_dry_soil_water_and_densitybottle_M3   : weight_of_dry_soil_water_and_densitybottle_M3,   
                    weight_of_densitybottle_and_water_M4            : weight_of_densitybottle_and_water_M4,
                    K_value                                         : specific_gravity_kval,
                    specific_gravity_G_at_T                         : specific_gravity_G,
                    corrected_specific_gravity_G_at_T_27            : corr_spec_grav_g
                }
            })
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
    }

//Calling the function with parameters as arguments
    getOneEntry(geoTstId){

        console.log("inside the get one test in specific gravity db", geoTstId);

        return new Promise((resolve, reject)=>{ 

            Determination_of_specific_gravity.findOne({"geoTestId":geoTstId}).exec()
            .then(response => resolve(response))
            .catch(err => reject(err))
        });    
    }
    
}

//Exporting the module
module.exports =  DeterminationOfSpecificGravityDB;
   