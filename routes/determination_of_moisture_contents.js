'use strict'

const express = require('express');
const router  = express.Router();

const determinationOfMoistureContentController = require('../core/geoTests/soil/determination_of_moisture_content_controller');
var dmc = new determinationOfMoistureContentController();

//for moisture content test update
router.post('/updatemoisturecontent/:geoTestId', (req, res) => {

    console.log("inside update route for moisture content");

    var gTstId                        = req.params.geoTestId;
    var methodOfTestAdopted           = req.body.methodOfTestAdopted;
    var timeOfInsertionInOven         = req.body.timeOfInsertionInOven;
    var timeOfRemovalFromOven         = req.body.timeOfRemovalFromOven;
    var cupNumber                     = req.body.cupNumber;
    var weight_of_cup_W1              = req.body.weight_of_cup_W1;
    var weight_of_wet_soil_and_cup_W2 = req.body.weight_of_wet_soil_and_cup_W2;
    var weight_of_dry_soil_and_cup_W3 = req.body.weight_of_dry_soil_and_cup_W3;

    dmc.updateTestEntry(gTstId, methodOfTestAdopted, timeOfInsertionInOven, timeOfRemovalFromOven, cupNumber, weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3)
    .then(result => {
        console.log("*********",result);
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in moisture test update", err)
        res.sendStatus(500);
    })    
});

router.get('/onemoisturetest/:geoTestId', (req, res) => {

    console.log("inside get one specific test route");

    var gTstId = req.params.geoTestId;

    dmc.getOneSpecificTest(gTstId)
    .then(result => {
        console.log("*********",result);
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in get moisture test ", err)
        res.sendStatus(500);
    })    
})

module.exports = router;