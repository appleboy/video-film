
describe('Utility Tool', function() {
  describe('numbers', function() {
    it('addCommas testing', function (done) {
      Utility.numbers.addCommas(1000).should.equal('1,000');
      Utility.numbers.addCommas(1000).should.not.be.eql(1000);

      done();
    });

    it('toInt testing', function (done) {
      Utility.numbers.toInt('1000').should.be.eql(1000);
      Utility.numbers.toInt('1000').should.not.be.eql('1000');

      done();
    });

    it('random testing', function (done) {
      Utility.numbers.random(1, 100).should.be.within(1, 100);

      done();
    });
  });

  describe('helpers', function() {
    it('capitalizeFirst testing', function (done) {
      Utility.helpers.capitalizeFirst('appleboy').should.equal('Appleboy');

      done();
    });
  });

  describe('formats', function() {
    it('isEmpty testing', function (done) {
      Utility.format.isEmpty('').should.be.ok;
      Utility.format.isEmpty(' ').should.be.ok;
      Utility.format.isEmpty('-').should.not.be.ok;

      done();
    });

    it('isNumber testing', function (done) {
      Utility.format.isNumber('10').should.be.ok;
      Utility.format.isNumber('0').should.be.ok;
      Utility.format.isNumber('-10').should.be.ok;

      done();
    });

    it('isFloat testing', function (done) {
      Utility.format.isFloat('1.01').should.be.ok;
      Utility.format.isFloat('10').should.be.ok;
      Utility.format.isFloat('-10.01').should.be.ok;

      done();
    });

    it('isDate testing', function (done) {
      Utility.format.isDate('2014-10-25').should.be.ok;
      Utility.format.isDate('2014-10-5').should.not.be.ok;
      Utility.format.isDate('2014').should.not.be.ok;

      done();
    });
  });
});
