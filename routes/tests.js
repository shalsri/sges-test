'use strict'

const express = require('express');
const router  = express.Router();
var multer    = require('multer');
const fs      = require('fs');

const TestController = require('../core/geoTests/common/testController');
var tc = new TestController();

const DeterminationOfMoistureContentController = require('../core/geoTests/soil/determination_of_moisture_content_controller');
var dmc = new DeterminationOfMoistureContentController();

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

router.get('/', (req, res) => {

    console.log("inside get all tests route");
    
    tc.getAllTests(req,res)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
});

//get all the test for the sample
router.get('/testsforsample/:sampleId', (req, res) => {

    console.log("inside get all tests for sample route");
    var samId = req.params.sampleId;

    console.log("sampleId", samId);
    
    tc.getAllTestsForSample(samId)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
});

router.get('/onetest/:uniqueTestId', (req, res)=> {

    console.log("inside get one test route");
    var uniqueTestId = req.params.uniqueTestId;

    tc.getOneTest(uniqueTestId)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
})

router.get('/gettestresult/:uniqueTestId', (req,res) =>{
    
    console.log("inside get result route in test route");

    var testId = req.params.uniqueTestId;
    console.log("************************************", testId)

    tc.getTestResults(testId)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
})

//plan test api cardNo, method, sampleId
router.post('/plantest', upload.array('photo', 12), (req, res) => {
    
    console.log("inside post plan test route");
    console.log("********************* planTest body", req.body);

    var tCardNo     = req.body.testCardNumber;
    var tstMethod   = req.body.testMethod;
    var tstStd      = req.body.testingStandard;
    var sId         = req.body.sampleId;

    var labTmp      = req.body.labTemperature;
    var labHumidity = req.body.labHumidity;
   
    var tstCrtTime  = req.body.testCreationTime;
    var tstSstTime  = req.body.testStartTime; 
    var tstEndTime  = req.body.testEndTime;
    var tstStatus   = req.body.testStatus;

    var sId         = req.body.sampleId;
    var pId         = req.body.projectId;
    var sWt         = req.body.sampleWeight;
    var sType       = req.body.sampleType;
    var sImgId      = req.body.sampleImageId;
    var dateOfArr   = req.body.dateOfSampleArrival;
    var dateOfLog   = req.body.dateOfSampleLogging;
    var sStatus     = req.body.sampleStatus;
    var testSeq     = req.body.testSequence;
    
    console.log("print type of", typeof(tstMethod));
    tc.planTest(tCardNo, tstMethod, tstStd, labTmp, labHumidity, tstCrtTime, tstSstTime, tstEndTime, sId, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq, tstStatus)
    .then(result => {
        console.log(result,"&&&&&&&&&&");
       res.sendStatus(200);
    })    
    .catch(err => {
        console.log("Sending response in test plan", err);
        res.sendStatus(500);
    })
});

router.post('/inittest/:uniqueTestId', (req, res)=> {

    console.log("inside init test route");

    var uniqueTestId = req.params.uniqueTestId;
    var tCardNo      = req.body.testCardNumber;
    var tstMethod    = req.body.testMethod;
    var tstStd       = req.body.testingStandard;
    var sId          = req.body.sampleId;

    var labTmp       = req.body.labTemperature;
    var labHumidity  = req.body.labHumidity;
    
    var tstCrtTime   = req.body.testCreationTime;
    var tstSstTime   = req.body.testStartTime; 
    var tstEndTime   = req.body.testEndTime;
    var tstStatus    = req.body.testStatus;

    tc.updateTestEntry(uniqueTestId, tCardNo, tstMethod, tstStd, sId, labTmp, labHumidity, gTstId, gTstIdSelect, tstCrtTime, tstSstTime, tstEndTime, testVideoId, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq, tstStatus)
    .then(result => {
        console.log(result,"*********");
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in test init", err)
        res.sendStatus(500);
    })
})

router.post('/updateTest/:uniqueTestId', upload.array('photo', 12), (req, res)=>{

    console.log("inside the update test route");
    console.log("req.body in update test", req.body);

    var uniqueTestId = req.params.uniqueTestId;
    var tCardNo      = req.body.testCardNumber;
    var tstMethod    = req.body.testMethod;
    var tstStd       = req.body.testingStandard;
    
    var labTmp       = req.body.labTemperature;
    var labHumidity  = req.body.labHumidity;
    var gTstIdSelect = req.body.geoTestIdSelected;
    var gTstId       = req.body.geoTestId;

    var tstCrtTime   = req.body.testCreationTime;
    var tstSstTime   = req.body.testStartTime; 
    var tstEndTime   = req.body.testEndTime;
    var tstStatus    = req.body.testStatus;

    var testVideoId  = mediaId;
    var sId          = req.body.sampleId;

    var  pId         = req.body.projectId;
    var sWt          = req.body.sampleWeight;
    var sType        = req.body.sampleType;
    var sImgId       = req.body.sampleImageId;
    var dateOfArr    = req.body.dateOfSampleArrival;
    var dateOfLog    = req.body.dateOfSampleLogging;
    var sStatus      = req.body.sampleStatus;
    var testSeq      = req.body.testSequence;
   
    console.log("print test id ", uniqueTestId,tCardNo, tstMethod, tstStd, sId, labTmp, labHumidity, gTstId, gTstIdSelect, tstCrtTime, tstSstTime, tstEndTime, testVideoId, tstStatus);
    console.log("sample details in route", pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq)

    tc.updateTestEntry(uniqueTestId,tCardNo, tstMethod, tstStd, sId, labTmp, labHumidity,  gTstId, gTstIdSelect, tstCrtTime, tstSstTime, tstEndTime, testVideoId,  tstStatus, pId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq)
    .then(result => {
        console.log(result,"*********");
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in test init", err)
        res.sendStatus(500);
    })

//    dmc.updateTestEntry(gTstId, methodOfTestAdopted, timeOfInsertionInOven, timeOfRemovalFromOven, cupNumber, weight_of_cup_W1, weight_of_wet_soil_and_cup_W2, weight_of_dry_soil_and_cup_W3 )
})

module.exports = router;