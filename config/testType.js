'use strict'

const testTypes = {

    DETERMINATION_OF_WATER_CONTENT                                : 0,  
    DETERMINATION_OF_SPECIFIC_GRAVITY                             : 1,
    DETERMINATION_OF_LIQUID_LIMIT_AND_PLASTIC_LIMIT               : 2,
    GRAIN_SIZE_ANALYSIS_HYDROMETER_METHOD                         : 3,
    DIRECT_SHEAR_TEST                                             : 4,                                            
    DETERMINATION_OF_SHRINKAGE_FACTORS                            : 5,
    METHOD_OF_DETERMINATION_OF_POINT_LOAD_STRENGTH_INDEX_OF_ROCKS : 6,
    DETERMINATION_OF_SPECIFIC_GRAVITY_AND_WATER_ABSORPTION        : 7,
    DETERMINATION_OF_WATER_CONTENT_POROSITY_DENSITY_ROCK_MATERIALS: 8,
    DETERMINATION_OF_MODULUS_OF_ELASTICITY_AND_POISSON_RATIO      : 9
}

Object.freeze(testTypes);
console.log("Det", typeof(testTypes.DETERMINATION_OF_LIQUID_LIMIT_AND_PLASTIC_LIMIT))
module.exports = testTypes;
 