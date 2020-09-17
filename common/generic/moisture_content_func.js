/* 
    generic function to fin the moisture content in tht soil.
    Takes input of three weights in grms  -- W1, W2, W3 and water Content W is found in grms

*/

'use strict'

function moistureContent(w1, w2, w3){

    console.log("inside moisture content func");

    var wt_of_cup_W1        = w1;
    var wt_of_wetsoilCup_W2 = w2;
    var wt_of_drysoilCup_W3 = w3;
    var waterContentW;

    waterContentW = ((wt_of_wetsoilCup_W2 - wt_of_drysoilCup_W3)/(wt_of_drysoilCup_W3 - wt_of_cup_W1)) * 100;    

    console.log("waterContent W is :" , waterContentW.toFixed(2) + "%");

    var waterContent_W = (waterContentW.toFixed(2));

    return waterContent_W;
}

module.exports = moistureContent;
