'use strict'

// packages required
const express = require('express');
const router  = express.Router();
var   multer  = require('multer');
const fs      = require('fs');

// Atterberg Limits Controller
const determinationOfAttbergLimitsController = require('../core/soil/determination_of_atterberg_limits_controller');
var dac = new determinationOfAttbergLimitsController();

var mediaId = null;

/* multer for Atterberg Limits observation videos and photos upload . Upload size limit needs to be set 
and uploads have to be restricted to certain extensions ( Incomplete ) */
var storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, '../labTest/common/testVideos/'); // destination folder for uploaded files to be saved
    },
    filename: function (req, file, cb) {
      
      mediaId = file.originalname; 
      console.log("mediaId", mediaId);
      cb(null,  file.originalname );  // Uploaded files will be saved in the server with their original names
    }
});

var upload = multer({ storage: storage });

// to get all the Atterberg tests
router.get('/',(req,res)=>{
    console.log("Inside all Atterberg Tests");

    dac.getAllTests(req,res) //getAllTests is defined in the Atterberg Limit DB.js file
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
});

// to send the video data in chunks
router.get('/testvideo', (req, res) => {

    let mediaId = req.query.mediaId;
    
    const path = 'common/testVideos/' + mediaId;
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
    
        if(start >= fileSize) {
            
            res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
            return
        }
  
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
    
        res.writeHead(206, head)
        file.pipe(res)
    } else {

        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)      
    };
});

// for attberg limits values update
router.post('/updateatterberglimits/:geoTestId',upload.array("uploadedImages",10),(req,res)=>{
    console.log("Req.files",req.files);
    console.log("inside update route for Atterberg limits update");

    var geoTestId                                    = req.params.geoTestId;
    var method_used                                  = req.body.method_used;
    var history_of_soil_sample                       = req.body.history_of_soil_sample;
    var period_of_soaking_soil_sample_before_testing = req.body.period_of_soaking_soil_sample_before_testing;
    var trialSelected                                = req.body.trialSelected;

    var number_of_blows_N                            = req.body.number_of_blows_N;
    var cup_number_ll                                = req.body.cup_number_ll;
    var weight_of_the_cup_ll                         = req.body.weight_of_the_cup_ll;
    var weight_of_wet_soil_cup_ll                    = req.body.weight_of_wet_soil_cup_ll;
    var weight_of_dry_soil_cup_ll                    = req.body.weight_of_dry_soil_cup_ll;
    
    var cup_number_pl                                = req.body.cup_number_pl;
    var weight_of_the_cup_pl                         = req.body.weight_of_the_cup_pl;
    var weight_of_wet_soil_cup_pl                    = req.body.weight_of_wet_soil_cup_pl;
    var weight_of_dry_soil_cup_pl                    = req.body.weight_of_dry_soil_cup_pl;
    

    dac.updateTestEntry(geoTestId,method_used,history_of_soil_sample,period_of_soaking_soil_sample_before_testing,trialSelected,number_of_blows_N,
        cup_number_ll,weight_of_the_cup_ll,weight_of_wet_soil_cup_ll,weight_of_dry_soil_cup_ll,cup_number_pl,weight_of_the_cup_pl,
        weight_of_wet_soil_cup_pl,weight_of_dry_soil_cup_pl)
    .then(result => {
        console.log(result,"********* attberg");
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in Atterberg test update", err)
        res.sendStatus(500);
    })  

});

/*router.post('/postvalues',upload.array("uploadedImages",10),(req,res)=>{
    console.log("Inside postValues route in Atterberg");
    console.log("Test values",req.body.testValues);
    let attTestValues = req.body.testValues;
    dac.updateTrialValues(attTestValues);
    console.log("After updating values through postvalues route");
    res.sendStatus(200);
});*/

//to get the result of the complete Atterberg Limits test
router.get('/getresults/:testId',(req, res) => {

    console.log('Inside get test result Atterberg Limits route');

    var testId = req.params.testId;

    dac.getTestResults(testId)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
});

// to get details of one Atterberg test
router.get('/getonetest/:geoTestId',(req,res)=>{

    console.log("inside get one test route - Atterberg");
    var geoTestId = req.params.geoTestId;
    dac.getOneTest(geoTestId)  // getOneTest function defined in the Atterberg Limits DB.js file
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))

});

// to delete a particular Atterberg Limits test
router.post('/deletetest/:geoTestId', (req, res)=> {

    console.log("inside delete one atterberg test route");
    var geoTestId = req.params.geoTestId;

    dac.deleteTest(geoTestId) // deleteTest function defined in the Atterberg Limits DB.js file
    .then(response => {
        console.log("Result",response);
        res.send({"success":true,"result":response})
    })
    .catch(err => res.sendStatus(500))
})



module.exports = router; // Exporting the router . Routes with /atterberglimitstests are handled here.
