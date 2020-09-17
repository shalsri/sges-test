'use strict'

//Calling the modules
const express = require('express');
const router  = express.Router();
var multer    = require('multer');
const fs      = require('fs'); 

const determinationOfSpecificGravityController = require('../core/geoTests/soil/determination_of_specific_gravity_controller');
var dsg = new determinationOfSpecificGravityController(); //Assigning a new variable 

var mediaId = null;

//multer for test video upload
var storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, '../lab/common/testVideos');
    },
    filename: function (req, file, cb) {
      
      mediaId = file.originalname; 
      console.log("mediaId", mediaId);
      cb(null,  file.originalname );
    }
});

var upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    console.log("Inside all Specific Gravity Tests");

    dsg.getAllTests(req,res) 
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
});

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

//Router to post the test 
router.post('/updatespecificgravity/:geoTestId', upload.array('photo', 12), (req, res) => {
   
    console.log("inside post specific gravity test route");
    console.log("********************* specificgravityTest body", req.body);

    //Variables assigned to the parameters
    var gTstId                                        = req.params.geoTestId;
    var type_of_liquid_used                           = req.body.type_of_liquid_used;
    var specific_gravity_of_liquid                    = req.body.specific_gravity_of_liquid;
    var time_during_test                              = req.body.time_during_test;
    var temperature_during_test_T                     = req.body.temperature_during_test_T;
    var density_bottle_Number                         = req.body.density_bottle_Number;  
    var weight_of_densitybottle_M1                    = req.body.weight_of_densitybottle_M1;
    var weight_of_dry_soil_and_densitybottle_M2       = req.body.weight_of_dry_soil_and_densitybottle_M2;
    var weight_of_dry_soil_water_and_densitybottle_M3 = req.body.weight_of_dry_soil_water_and_densitybottle_M3;
    var weight_of_densitybottle_and_water_M4          = req.body.weight_of_densitybottle_and_water_M4;
    var testVideoId                                   = mediaId;

    console.log("print M4", req.body.weight_of_densitybottle_and_water_M4)

    //Calling the function with parameters as arguments
    dsg.updateTestEntry(gTstId, type_of_liquid_used, specific_gravity_of_liquid, time_during_test, temperature_during_test_T,
                        density_bottle_Number, weight_of_densitybottle_M1, weight_of_dry_soil_and_densitybottle_M2,
                        weight_of_dry_soil_water_and_densitybottle_M3, weight_of_densitybottle_and_water_M4, testVideoId)
   
    .then(result => { 
        console.log(result,"*********");
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in specific gravity test update", err)
        res.sendStatus(500);
    }) 

//Router to get the result
router.get('/getresultspgravity/:testId'), (req, res) => {

    console.log('Inside get test result specific gravity route');

    var testId = req.params.testId;

    dsg.getTestResults(testId)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
    }

});

// to get details of one Specific Gravity test
router.get('/getonetest/:geoTestId',(req,res)=>{

    console.log("inside get one test route - Specific Gravity", geoTestId);

    var geoTestId = req.params.geoTestId;

    dsg.getOneSpecificTest(geoTestId) 
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))

});

module.exports = router; //Exporting the module