'use strict';

var request = require('supertest');

describe('NbaController', function() {
  describe('index', function() {
    it('should return success', function (done) {
      request(sails.hooks.http.app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('channel', function() {
    it('empty tag name', function (done) {
      request(sails.hooks.http.app)
        .get('/channel/')
        .expect(302)
        .expect('location','/', done);
    });

    it('empty data of tag', function (done) {
      request(sails.hooks.http.app)
        .get('/channel/top_plays')
        .expect(302)
        .expect('location','/', done);
    });

    it('get top10 tag of data', function (done) {
      request(sails.hooks.http.app)
        .get('/channel/top10')
        .expect(200, done);
    });
  });
});
