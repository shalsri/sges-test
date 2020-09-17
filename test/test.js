'use strict'

//Import the dependencies for testing
const chai = require('chai');

var assert = require('chai').assert;
var expect = chai.expect;

const SERVER = require('../server');

var TestController = require('../core/geoTests/common/testController');
var tc = new TestController();

//Configure chai
chai.should();

//Unit Testing
describe('Tests for Test Controller ', () => {
    describe('getAllTests in Test COntroller', () => {
        //Simple Get All Test
        it("Should get all the Tests", (done) => {
            tc.getAllTests()
            .then((res) => {
                const body = res;
                console.log('Body', body);
                assert.typeOf(body,'array');
                done();
            })
            .catch((err => done(err)));
        });
    });

      
    describe(' UpdateTestEntry Function in Test Controller', () => { 
        //Test to plan the test in controller
       
       it("Should update the test", (done) => {
        // let testId = 'LDZqS8nqV';
           let updated_test = {
                "uniqueTestId"          :"8-XW2FlVdt",
               "testCardNumber"         : "TC152",
               "testMethod"             : 0,
               "testingStandard"        : "AFDS",
               "sampleId"              : "s001",
               "labTemperature"         : 27,
               "labHumidity"            : 80,
               "geoTestId"              : "B-dXZUdZp",
               "geoTestIdSelected"       : [],
               "predefinedTrials"       : 1,
               "testCreationTime"       : 5667,
               "testStartTime"          : 5789,
               "testEndTime"            : 8790,
               "testVideoId"            : "V001",
               "testStatus"             : "In Progress"                 
           }
           tc.updateTestEntry( updated_test.uniqueTestId,updated_test.testCardNumber, updated_test.testMethod, updated_test.testingStandard, updated_test.sampleId, updated_test.labTemperature, updated_test.labHumidity, 
            updated_test.geoTestId, updated_test.geoTestIdSelected, updated_test.predefinedTrials, updated_test.testCreationTime, updated_test.testStartTime, updated_test.testEndTime, updated_test.testVideoId, updated_test.testStatus)
           .then(res=>{
            let body  = res ;
            console.log("Body after updateTestEntry",body,body.n);
            assert.equal(body.n,1);
            done()
          })
          .catch(err=>done(err));
       });
   });
});