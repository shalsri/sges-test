'use strict'

const Test = require('../../schemas/geoTests/common/testSchema');
 
class ModulusOfElasticityAndPoissonRatioDB {

    constructor(){}

    createEntry(){

        console.log("inside the create poissontest func in poissonDb.js");

        return new Promise((resolve, reject) =>{

            var ePoissonRatio =  new modulusOfElasticityAndPoissonRatio({
              
                weight: 400
           
            });
        
            ePoissonRatio.save()
            .then(response => resolve(response))
            .catch(err => reject(err));
        })     
    };

    updateDimensionsEntry(tId, dDia, dArea, dLen, sgesId){
        console.log("inside update dimensions entry func in poisson db")
        console.log("print params", tId, dDia, dArea, dLen, sgesId);
        return new Promise((resolve, reject)=>{

            ModulusOfElasticityAndPoissonRatio.updateOne({_id:sgesId},
                
            {$set: 
                { 
                    "dimensions.diameter": dDia,
                    "dimensions.area"    : dArea,     // in sq mm
                    "dimensions.length"  : dLen,     // in mm
                    
                }
            })
            .then(response => resolve(response))
            .catch(err => reject(err));
        });   
    }

    deleteEntry(){}
    listEntry(){}
    

}

module.exports = ModulusOfElasticityAndPoissonRatioDB;