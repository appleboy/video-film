
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

  describe('tags', function() {
    it('get tag string', function (done) {
      Utility.tag.getValue('top_plays').should.equal('精彩好球');
      Utility.tag.getValue('play_week').should.equal('每週十大');

      done();
    });

    it('get ID string', function (done) {
      Utility.tag.getID('/video/channels/top_plays/2015/02/06/20150206-top-10.nba').should.equal('top10');
      Utility.tag.getID('/video/channels/top_plays/2015/02/06/20150206-daily-zap.nba').should.equal('zap');

      done();
    });

    it('get ID Tag string', function (done) {
      Utility.tag.getTR('/video/channels/top_plays/2015/02/06/20150206-top-10.nba').should.equal('十大好球');
      Utility.tag.getTR('/video/channels/top_plays/2015/02/06/20150206-daily-zap.nba').should.equal('每日鬥士');

      done();
    });

    it('get title convert string', function (done) {
      Utility.tag.getConvert('Magic vs Celtics').should.equal('魔術 vs 塞爾蒂克');
      Utility.tag.getConvert('Lakers vs Bucks').should.equal('湖人 vs 公鹿');
      Utility.tag.getConvert('Knicks').should.equal('尼克');
      Utility.tag.getConvert('Raptors').should.equal('暴龍');

      done();
    });

    it('get Random Tag string', function (done) {
      Utility.tag.tags.length.should.equal(8);

      Utility.tag.tags.indexOf(Utility.tag.getRandom()).should.not.equal(-1);
      done();
    });
  });
});
