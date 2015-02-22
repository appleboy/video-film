'use strict';

var BluePromise = require('bluebird');

describe('Video Model', function() {
  it ('should not be empty', function(done) {
    Video.find().exec(function(err, rows) {
      rows.length.should.be.eql(fixtures.video.length);

      done();
    });
  });

  it ('test increae on base model', function(done) {
    Video.increase('view_counts', 3);
    Video.increase('view_counts', 1, function(res) {
      Video.findOne(1)
        .exec(function(err, video) {
          video.view_counts.should.be.eql(11);
          done();
      });
    });
  });

  it ('test decreae on base model', function(done) {
    Video.decrease('view_counts', 4);
    Video.decrease('view_counts', 2, function(res) {
      Video.findOne(2)
        .exec(function(err, video) {
          video.view_counts.should.be.eql(19);
          done();
      });
    });
  });

  it ('get video extension name', function(done) {
    Video.findOne(1).exec(function(err, video) {
      video.getSrcExtName().should.eql('flv');
      done();
    });
  });

  it ('test video search method', function(done) {
    Video.search({
      limit: 1,
      q: 'recap'}, function(res) {
      res.hits.hits.length.should.eql(1);
      done();
    });
  });

  it ('test sort parameter', function(done) {
    Video.search({
      sort: true,
      limit: 1,
      q: 'recap'}, function(res) {
      res.hits.hits.length.should.eql(1);
      done();
    });
  });

  it('return Promise object', function() {
    var Promise = Video.search({
      promise: true,
      sort: true,
      limit: 1,
      q: 'recap'
    });

    Promise.should.not.be.a.Promise;
  });

  it ('test video search via promise', function(done) {
    var Promise = Video.search({
      promise: true,
      sort: true,
      limit: 1,
      q: 'recap'
    });

    BluePromise.props({
      videos: Promise
    }).then(function(result) {
      result.videos.hits.hits.length.should.eql(1);
      done();
    });
  });
});
