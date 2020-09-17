var request = require('supertest');
 
var SERVER = require('../server');
 
 
 
describe('get /', function() {
 
  it('respond with hello world', function(done) {
 
    request(SERVER).get('/').expect('hello world', done);
 
  });
 
});