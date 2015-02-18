var request = require('supertest');

describe('WelcomeController', function() {
  describe('index', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/welcome')
        .expect(200, done);
    });
  });
});
