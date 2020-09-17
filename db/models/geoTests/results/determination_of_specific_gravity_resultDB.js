'use strict'

const Test = require('../../schemas/geoTests/common/testSchema');
const shortid = require('shortid');

var DeterminationOfSpecificGravityResult = require('../../../../db/models/schemas/geoTests/results/determination_of_specific_gravity_result_sch');;

class SpecifiGravityResultDB{

    constructor(){}

    createResultEntry(testId, gTstSelId, avg_corr_sp_grav_g){
        
        console.log("inside create DeterminationOfSpecificGravityResult func", testId);

        var genresultId = shortid.generate()
        console.log("printing the generated result id", genresultId);

        return new Promise((resolve, reject) =>{           

            var resultEntry =  new DeterminationOfSpecificGravityResult({

                uniqueResultId                           : genresultId,
                testId                                   : testId,
                geoTestIdSelected                        : gTstSelId,                
                avg_corrected_specific_gravity_G_at_T_27 : avg_corr_sp_grav_g 
            });
            
            resultEntry.save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })       
    };

}

module.exports =  SpecifiGravityResultDB;