describe('Videos', function() {
  it ('should not be empty', function(done) {
    Video.find().exec(function(err, rows) {
      rows.length.should.be.eql(fixtures['video'].length);

      done();
    });
  });
});
