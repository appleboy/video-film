/**
* utility.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var util = require('./helpers'),
  hop = util.object.hasOwnProperty;

module.exports = {
  ReplaceTag: function(str) {
    var replace_object = {
      'top10': '十大好球',
      'play_week': '每週十大',
      'zap': '每日好球',
      'dunk': '每日灌籃',
      'steal': '每日抄球',
      'nightly': '晚間精華',
      'block': '每日火鍋',
      'assist': '每日助攻'
    };

    str = str === null ? '' : String(str);

    return hop(replace_object, str) ? str.replace(str, replace_object[str]) : '精華賽事';
  },

  getStringTag: function (str) {
    var tag, replace_rexp = {
      'play_week': /(plays-of-the-week|plays-week|potw)\.nba/,
      'top10': /top-?10/,
      'zap': /(daily-)?zap\.nba/,
      'dunk': /dunk/,
      'steal': /steal/,
      'nightly': /nightly/,
      'assist': /assist/,
      'block': /block/
    };

    _.forEach(replace_rexp, function(value, key) {
      if (value.test(str)) {
        tag = key
        return false;
      }
    });

    return tag ? tag : this.getRandomTag();
  },

  getRandomTag: function () {
    var tags = ['top10', 'play_week', 'zap', 'dunk',
      'steal', 'nightly', 'block', 'assist'];

    return tags[_.random(tags.length)];
  }
};

