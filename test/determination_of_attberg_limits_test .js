var assert = require('chai').assert;
//const request = require('supertest'); // for making http requests

const app = require('../server');

var db = require('mongoose');

const determinationOfAttbergLimitsController = require('../core/geoTests/soil/determination_of_atterberg_limits_controller');
var dac = new determinationOfAttbergLimitsController();

// async function connectDB(){
//     await db.connect('mongodb://localhost:27017/sarathyGeoTech', { useNewUrlParser: true }).then(() => {
//     console.log("Connected to Database");
//     }).catch((err) => {
//         console.log("Not Connected to Database . ERROR! ", err);
//     });
// }

before(function() {        
  return new Promise((resolve,reject) => {
      app.on("appStarted", function(){
          return resolve();
      }); 
  });
});


//checking for functions present in Atterberg Controller
describe("Checking Atterberg controller functions",function(){
//   before( async()=>{
//     await connectDB();
//     console.log("Before hook function");
// });

  after(()=>{
    console.log("After hook function");
  });
  
  describe("getAllTests controller function",function(){
    it('Get all tests', function(done){
      dac.getAllTests()
        .then((res) => {
          const body = res;
          //console.log("Body",body);
          assert.typeOf(body,'array');
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("getOneTest controller function",function(){
    it("Get one test using a particular geoTestId",function(done){
      let geoTestId = "jv43HDL_z";
      dac.getOneTest(geoTestId)
      .then(res=>{
        const body = res;
        //console.log("Body",body);
        assert.typeOf(body,'object');
        done();
      })
      .catch(err=>done(err));
    })
  });

  describe("getTestResults controller function",function(){
    it("Get the test result using the particular testId",function(done){
      let testId = "-YeQzes-wi";
      dac.getTestResults(testId)
      .then(res=>{
        const body = res;
        console.log("Body",body);
        assert.typeOf(body,'object');
        done();
      })
      .catch(err=>done(err));
    })
  });

  describe("UpdateTestEntry controller function",function(){
    it("Update a test entry using the particular geotestid",function(done){
      let dataToUpdate = {
          "geoTestId"                                    : "jv43HDL_z",
          "method_used"                                  : "Mechanical",
          "history_of_soil_sample"                       : "Air Dried",
          "period_of_soaking_soil_sample_before_testing" : 35,
          "trialSelected"                                : false,
          "number_of_blows_N"                            : 27,
          "cup_number_ll"                                : "WC-52",
          "weight_of_the_cup_ll"                         : 31.58,
          "weight_of_wet_soil_cup_ll"                    : 58,
          "weight_of_dry_soil_cup_ll"                    : 50.43,
          "cup_number_pl"                                : "13",
          "weight_of_the_cup_pl"                         : 34.78,
          "weight_of_wet_soil_cup_pl"                    : 46.51,
          "weight_of_dry_soil_cup_pl"                    : 44.79
      };

      dac.updateTestEntry(dataToUpdate.geoTestId,dataToUpdate.method_used,dataToUpdate.history_of_soil_sample,
        dataToUpdate.period_of_soaking_soil_sample_before_testing,dataToUpdate.trialSelected,dataToUpdate.number_of_blows_N,
        dataToUpdate.cup_number_ll,dataToUpdate.weight_of_the_cup_ll,dataToUpdate.weight_of_wet_soil_cup_ll,dataToUpdate.weight_of_dry_soil_cup_ll,
        dataToUpdate.cup_number_pl,dataToUpdate.weight_of_the_cup_pl,dataToUpdate.weight_of_wet_soil_cup_pl,dataToUpdate.weight_of_dry_soil_cup_pl)
        .then(res=>{
          let body  = res ;
          console.log("Body after updateTestEntry",body,body.n);
          assert.equal(body.n,1);
          done();
        })
        .catch(err=>done(err));
    });
  });

});

// API checks
//  describe("Get all Atterberg tests route",function(){
      
//     it('Get all Atterberg Tests', function(done){
//       request(app).get('/atterberglimitstests')
//         .then((res) => {
//           const body = res.body;
//           console.log("Res status",res.status);
//           //console.log("Res body",body);
//           assert.typeOf(body,'array');
//           assert.equal(res.status,200);
//           done();
//         })
//         .catch((err) => done(err));
//     });
//   });

//   describe("Get a particular test result",function(){
      
//     it('Get a particular Atterberg test id', function(done){
//       request(app).get('/atterberglimitstests/getonetest/jv43HDL_z')
//         .then((res) => {
//           const body = res.body;
//           console.log("Res status",res.status);
//           //console.log("Res body",body);
//           //assert.typeOf(body,'array');
//           assert.equal(res.status,200);
//           done();
//         })
//         .catch((err) => done(err));
//     });
//   });






