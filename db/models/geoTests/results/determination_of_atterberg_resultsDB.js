'use strict'

//const Test = require('../../schemas/geoTests/common/testSchema');
const shortid = require('shortid');

var DeterminationOfAtterbergLimitsResults = require('../../../../db/models/schemas/geoTests/results/atterberg_limits_result_schema');;

class AtterbergLimitsResultDB{

    constructor(){}

    createResultEntry(testId,liquid_limit_LL,plastic_limit_PL,plasticity_index_IP){
        
        console.log("inside create DeterminationOfAtterbergLimitsResults func", testId);

        var genresultId = shortid.generate()
        console.log("Printing the generated result id", genresultId);

        return new Promise((resolve, reject) =>{           

            var resultEntry =  new DeterminationOfAtterbergLimitsResults({

                uniqueResultId                           : genresultId,
                testId                                   : testId,
                liquid_limit_LL                          : liquid_limit_LL,
                plastic_limit_PL                         : plastic_limit_PL,
                plasticity_index_IP	                     : plasticity_index_IP	,
                //group_symbol                           : group_symbol

            });
            
            resultEntry.save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })       
    };

}

module.exports =  AtterbergLimitsResultDB;