/*
    function that will return the K value for a given temperature,
    that is used to find the corrected specific gravity of a soil sample
*/

'use strict'

var sg_test_K_value =
[
    0,                    
    0,
    0,
    0,
    1.003469999,        //Temperature  4 deg centigrade
    1.003461971,        //Temperature  5 deg centigrade
    1.003437888,        //Temperature  6 deg centigrade
    1.003399756,        //Temperature  7 deg centigrade
    1.003345569,        //Temperature  8 deg centigrade
    1.003278336,        //Temperature  9 deg centigrade
    1.003197055,        //Temperature  10 deg centigrade
    1.003101726,        //Temperature  11 deg centigrade
    1.002993351,        //Temperature  12 deg centigrade
    1.002871931,        //Temperature  13 deg centigrade
    1.00273847,         //Temperature  14 deg centigrade                    
    1.00259397,         //Temperature  15 deg centigrade    
    1.002436425,        //Temperature  16 deg centigrade
    1.002267842,        //Temperature  17 deg centigrade
    1.002088221,        //Temperature  18 deg centigrade
    1.001897562,        //Temperature  19 deg centigrade
    1.001695864,        //Temperature  20 deg centigrade
    1.001484132,        //Temperature  21 deg centigrade
    1.001261362,        //Temperature  22 deg centigrade
    1.001028557,        //Temperature  23 deg centigrade
    1.00078672,         //Temperature  24 deg centigrade
    1.000533846,        //Temperature  25 deg centigrade
    1.00027194,         //Temperature  26 deg centigrade
    1,                  //Temperature  27 deg centigrade
    0.999719028,        //Temperature  28 deg centigrade
    0.999430029,        //Temperature  29 deg centigrade
    0.999130995,        //Temperature  30 deg centigrade
    0.99882293,         //Temperature  31 deg centigrade
    0.998506837,        //Temperature  32 deg centigrade
    0.998182716,        //Temperature  33 deg centigrade
    0.997849564,        //Temperature  34 deg centigrade
    0.997508384,        //Temperature  35 deg centigrade
    0.99716018,         //Temperature  36 deg centigrade
    0.996803948,        //Temperature  37 deg centigrade
    0.996439688,        //Temperature  38 deg centigrade
    0.996067401,        //Temperature  39 deg centigrade
    0.995689093,        //Temperature  40 deg centigrade
    0.995301753,        //Temperature  41 deg centigrade
    0.9949104,          //Temperature  42 deg centigrade
    0.994509012,        //Temperature  43 deg centigrade
    0.994097589,        //Temperature  44 deg centigrade
    0.993676132         //Temperature  45 deg centigrade
]

function getKValue(temp) {
   
    console.log("inside k value func", temp);

    console.log("K value for given temp is: " , sg_test_K_value[temp]);
    
    return sg_test_K_value[temp];
}

module.exports = getKValue;