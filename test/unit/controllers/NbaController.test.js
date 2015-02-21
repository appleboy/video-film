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

    it('get top10 tag of ajax data', function (done) {
      request(sails.hooks.http.app)
        .get('/channel/top10?ajax=1')
        .expect(200, done);
    });
  });

  describe('search video', function() {
    it('test search method', function (done) {
      request(sails.hooks.http.app)
        .get('/search?q=recap')
        .expect(200, done);
    });

    it('empty keyword', function (done) {
      request(sails.hooks.http.app)
        .get('/search')
        .expect(302)
        .expect('location','/', done);
    });

    it('search via ajax method', function (done) {
      request(sails.hooks.http.app)
        .get('/search?q=recap&ajax=1')
        .expect(200, done);
    });
  });

  describe('show method', function() {
    it('url not found', function (done) {
      request(sails.hooks.http.app)
        .get('/video')
        .expect(404, done);
    });

    it('show single video', function (done) {
      request(sails.hooks.http.app)
        .get('/video/games/suns/2015/01/28/0021400691-was-phx-recap.nba')
        .expect(200, done);
    });

    it('video not found', function (done) {
      request(sails.hooks.http.app)
        .get('/video/games/suns/2015/01/28/0021400691-was-phx-recap-1.nba')
        .expect(302)
        .expect('location','/', done);
    });
  });

  describe('Video notification:', function() {
    it('Without api key, password and nba id', function (done) {
      request(sails.hooks.http.app)
        .post('/blast')
        .expect(403, done);
    });

    it('Wrong api key, password', function (done) {
      var data = {
        'nba_id': '/video/games/suns/2015/01/28/0021400691-was-phx-recap.nba',
        'api_key': '1234',
        'api_password': '1234'
      };
      request(sails.hooks.http.app)
        .post('/blast')
        .send(data)
        .expect(403, done);
    });

    it('video not found', function (done) {
      var data = {
        'nba_id': '/video/games/suns/2015/01/28/0021400691-was-phx-recap-1.nba',
        'api_key': 'video-film',
        'api_password': 'video-film'
      };
      request(sails.hooks.http.app)
        .post('/blast')
        .send(data)
        .expect(302)
        .expect('location','/', done);
    });

    it('show single video', function (done) {
      var data = {
        'nba_id': '/video/games/suns/2015/01/28/0021400691-was-phx-recap.nba',
        'api_key': 'video-film',
        'api_password': 'video-film'
      };
      request(sails.hooks.http.app)
        .post('/blast')
        .send(data)
        .expect(200, done);
    });
  });
});
