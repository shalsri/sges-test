var request = require('supertest');
 
var SERVER = require('../server');
 
 
 
describe('get /testroute', function() {
 
  it('respond with hello world', function(done) {
 
    request(SERVER).get('/').expect('hello jenkins AGAIN', done);
 
  });
 
});