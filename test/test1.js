var request = require('supertest');
 
var SERVER = require('../server');
 
 
 
describe('GET /testroute', function() {
 
  it('hello jenkins AGAIN', function(done) {
 
    request(SERVER).get('/testroute').expect('hello jenkins AGAIN', done);
 
  });
 
});