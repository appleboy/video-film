describe('Tags', function() {
  it('should not be empty', function(done) {
    Tag.find().exec(function(err, rows) {
      rows.length.should.be.eql(fixtures['tag'].length);

      done();
    });
  });

  it('find top10 tag', function(done) {
    Tag.videos({'tag': 'top5', 'limit': 1}, function (data) {
      data.total_counts.should.be.eql(2);
      data.videos.length.should.be.eql(1);

      done();
    });
  });

});
