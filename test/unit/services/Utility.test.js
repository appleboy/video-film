'use strict';

describe('Utility Tool', function() {
  describe('numbers', function() {
    it('addCommas testing', function () {
      Utility.numbers.addCommas(1000).should.equal('1,000').and.should.not.be.eql(1000);
    });

    it('toInt testing', function () {
      Utility.numbers.toInt('1000').should.be.eql(1000).and.should.not.be.eql('1000');
    });

    it('random testing', function () {
      Utility.numbers.random(1, 100).should.be.within(1, 100);
    });
  });

  describe('helpers', function() {
    it('capitalizeFirst testing', function () {
      Utility.helpers.capitalizeFirst('appleboy').should.equal('Appleboy');
    });

    it('object testing', function () {
      var test = {
        'foo': 'bar'
      }, test2 = null;

      Utility.helpers.object.should.be.an.instanceOf(Object);
      Utility.helpers.object.hasOwnProperty(test, 'foo').should.be.ok;
      Utility.helpers.object.hasOwnProperty(test, 'bar').should.not.be.ok;
      Utility.helpers.object.hasOwnProperty(test2, 'foo').should.not.be.ok;
    });
  });

  describe('formats', function() {
    it('isEmpty testing', function () {
      Utility.format.isEmpty('').should.be.ok;
      Utility.format.isEmpty(' ').should.be.ok;
      Utility.format.isEmpty('-').should.not.be.ok;
    });

    it('isNumber testing', function () {
      Utility.format.isNumber('10').should.be.ok;
      Utility.format.isNumber('0').should.be.ok;
      Utility.format.isNumber('-10').should.be.ok;
      Utility.format.isNumber('a').should.not.be.ok;
    });

    it('isFloat testing', function () {
      Utility.format.isFloat('1.01').should.be.ok;
      Utility.format.isFloat('10').should.be.ok;
      Utility.format.isFloat('-10.01').should.be.ok;
      Utility.format.isNumber('a').should.not.be.ok;
    });

    it('isDate testing', function () {
      Utility.format.isDate('2014-10-25').should.be.ok;
      Utility.format.isDate('2014-10-5').should.not.be.ok;
      Utility.format.isDate('2014').should.not.be.ok;
    });
  });

  describe('tags', function() {
    it('get tag string', function () {
      Utility.tag.getValue('top_plays').should.equal('精彩好球');
      Utility.tag.getValue('play_week').should.equal('每週十大');
    });

    it('get ID string', function () {
      Utility.tag.getID('/video/channels/top_plays/2015/02/06/20150206-top-10.nba').should.equal('top10');
      Utility.tag.getID('/video/channels/top_plays/2015/02/06/20150206-daily-zap.nba').should.equal('zap');
    });

    it('get ID Tag string', function () {
      Utility.tag.getTR('/video/channels/top_plays/2015/02/06/20150206-top-10.nba').should.equal('十大好球');
      Utility.tag.getTR('/video/channels/top_plays/2015/02/06/20150206-daily-zap.nba').should.equal('每日鬥士');
    });

    it('get title convert string', function () {
      Utility.tag.getConvert('Magic vs Celtics').should.equal('魔術 vs 塞爾蒂克');
      Utility.tag.getConvert('Lakers vs Bucks').should.equal('湖人 vs 公鹿');
      Utility.tag.getConvert('Knicks').should.equal('尼克');
      Utility.tag.getConvert('Raptors').should.equal('暴龍');
      Utility.tag.getConvert('').should.not.be.ok;
    });

    it('get Random Tag string', function () {
      Utility.tag.tags.length.should.equal(8);
      Utility.tag.tags.indexOf(Utility.tag.getRandom()).should.not.equal(-1);
    });
  });
});
