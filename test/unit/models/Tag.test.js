'use strict';

var BluePromise = require('bluebird');

describe('Tags', function() {
  it('should not be empty', function(done) {
    Tag.find().exec(function(err, rows) {
      rows.length.should.be.eql(fixtures.tag.length);

      done();
    });
  });

  it('find top10 tag', function(done) {
    Tag.videos({'tag': 'top5', 'limit': 1}, function (data) {
      data.total_counts.should.be.eql(2);
      data.videos.length.should.be.eql(1);
    });

    var Promise = Tag.videos({'promise': true, 'tag': 'top10', 'limit': 1});

    Promise.should.not.be.a.Promise;

    BluePromise.props({
      tags: Promise
    }).then(function(result) {
      result.tags.total_counts.should.be.eql(5);
      result.tags.videos.length.should.be.eql(1);
    });

    done();
  });

});
