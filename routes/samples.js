'use strict'

const express =  require('express');
const router = express.Router();
var multer  = require('multer');
const fs = require('fs');

const SampleController = require('../core/geoTests/common/sampleController');
var sc = new SampleController();

var mediaId = null;

//multer for sample image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../lab/common/samples');
    },
    filename: function (req, file, cb) {
      
      mediaId = file.originalname; 
      console.log("mediaId", mediaId);
      cb(null,  file.originalname );
    }
});
  
var upload = multer({ storage: storage });


// get all samples or samples in a project route
router.get('/', (req, res) => {
    console.log("inside get all samples route");
    let pId = req.query.projectId;
    console.log("print proj id", pId);

    if(null == pId){
        sc.getAllSamples()
        .then(response => res.send(response))
        .catch(err => res.sendStatus(500))
    } else{
        console.log("inside else");
        sc.getSamplesForProject(pId)
        .then(response => res.send(response))
        .catch(err => res.sendStatus(500))
    }
   
});

var upload = multer({ storage: storage });

// get one sample
router.get('/onesample/:uniqueSampleId', (req, res) =>{
    console.log("inside get one sample route");
    let sId = req.params.uniqueSampleId;
    console.log("*******", sId);
    sc.getOneSample(sId)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
});

// get sample image
router.get('/sampleimage', (req, res) => {
    console.log("inside get sampleimage route");
    let mediaId = req.query.mediaId;
    console.log(mediaId);
    let path = 'common/samples/'+ mediaId;    
    
    //read the image using fs and send the image content back in the response
    fs.readFile(path,  function (err, content) {
      if (err) {
          res.writeHead(400, {'Content-type':'text/html'})
          console.log(err);
          res.end("No such image");    
      } else {
          //specify the content type in the response will be an image
          res.writeHead(200,{'Content-type':'image/jpg'});
          res.end(content);
        }
    });
})

//get all the test ids for the sample
router.get('/testidsforsample/:uniqueSampleId', (req, res)=>{
    
    var sId = req.params.uniqueSampleId;
    console.log("inside get test ids for sample route", sId);
    sc.getTestIdsForSample(sId)
    .then(response => res.send(response))
    .catch(err => res.sendStatus(500))
})

//create sample route
router.post('/initSample',upload.array('photo', 12),(req, res) => {
    
    console.log("inside post init sample route");
    console.log("********************* initSample body", req.body);
    
    var pId       = req.body.projectId;
    var sWt       = req.body.sampleWeight;
    var sType     = req.body.sampleType;
    var dateOfArr = req.body.dateOfSampleArrival;
    var dateOfLog = req.body.dateOfSampleLogging;
   
    var sId       = req.body.sampleId;
    var sStatus   = req.body.sampleStatus;
    var testSeq   = req.body.testSequence;
    var sImgId    = mediaId;

    sc.initSample(pId, sId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq)
    .then(result => {
        console.log(result,"&&&&&&&&&&");
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in sample init", err);
        res.sendStatus(500)
    })
});

router.post('/updatesample/:uniqueSampleId', upload.array('photo', 12),(req, res)=>{

    console.log("inside the update sample route");
    console.log("req.body in update sample", );
    console.log("print**********", req.body.projectId);
    
    var uniqueSampleId = req.params.uniqueSampleId;
    var pId            = req.body.projectId;
    var sId            = req.body.sampleId;
    var sWt            = req.body.sampleWeight;
    var sType          = req.body.sampleType;
    var dateOfArr      = req.body.dateOfSampleArrival;
    var dateOfLog      = req.body.dateOfSampleLogging;
    var sStatus        = req.body.sampleStatus;
    var testSeq        = req.body.testSequence;
    var sImgId         = mediaId;

    console.log("print params ", pId, sId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq);

    sc.updateSample(pId, sId, uniqueSampleId, sWt, sType, sImgId, dateOfArr, dateOfLog, sStatus, testSeq)
    .then(result => {
        console.log(result,"&&&&&&&&&&");
        res.send({"success":true, "result": result});
    })    
    .catch(err => {
        console.log("Sending response in test init", err);
        res.sendStatus(500)
    })
})

module.exports = router;