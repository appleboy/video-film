/**
* tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var util = require('./helpers'),
  hop = util.object.hasOwnProperty,
  tag_string = {
    'play_week': '每週十大',
    'top10': '十大好球',
    'zap': '每日好球',
    'dunk': '每日灌籃',
    'steal': '每日抄球',
    'nightly': '晚間精華',
    'block': '每日火鍋',
    'assist': '每日助攻',
    'recap': '賽事精華',
    'fool': '烏龍好球'
  },
  tag_rexp = {
    'play_week': /(plays?-of-the-week|plays-week|dpow|aotw|potw|dotw|top-defens(e|ive)|top-finals?-play)/,
    'top10': /top-?(10|5)/,
    'zap': /(daily-)?zap/,
    'dunk': /dunk/,
    'steal': /steal/,
    'nightly': /nightly/,
    'assist': /assist/,
    'block': /block/,
    'recap': /recap/,
    'fool': /shaqtin(-a)?(-fool)?/i
  };

module.exports = {
  getValue: function(str) {

    str = str === null ? '' : String(str);

    return hop(tag_string, str) ? str.replace(str, tag_string[str]) : '';
  },

  getID: function (str, random) {
    var tag,
      random = random || false;

    _.forEach(tag_rexp, function(value, key) {
      if (value.test(str)) {
        tag = key
        return false;
      }
    });

    return tag ? tag : (random) ? this.getRandom() : '';
  },

  getTR: function(str) {
    return this.getValue(this.getID(str));
  },

  getRandom: function () {
    var tags = ['top10', 'play_week', 'zap', 'dunk',
      'steal', 'nightly', 'block', 'assist'];

    return tags[_.random(tags.length)];
  }
};

