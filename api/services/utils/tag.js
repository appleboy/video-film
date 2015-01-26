/**
* tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var util = require('./helpers'),
  hop = util.object.hasOwnProperty,
  tag_string = {
    'top_plays': '精彩好球',
    'play_week': '每週十大',
    'top10': '十大好球',
    'playday': '每日好球',
    'zap': '每日鬥士',
    'dunk': '每日灌籃',
    'steal': '每日抄球',
    'nightly': '晚間精華',
    'block': '每日火鍋',
    'assist': '每日助攻',
    'recap': '賽事精華',
    'fool': '烏龍好球',
    'dunk_week': '每周灌籃',
    'assist_week': '每周抄球',
    'defensive_week': '每周防守',
    'plays_month': '單月十大',
    'play_season': '單季十大'
  },
  tag_rexp = {
    'play_week': /assists?-(of-the-)?week|dunks-week|(plays?-(of-the-)?week|dpow|aotw|potw|dotw|(top-)?defens(e|ive)(-week)?|top-finals?-play)/i,
    'top10': /top-?(10|5)/i,
    'playday': /play-of-the-day/i,
    'zap': /(daily-)?zap/i,
    'dunk': /dunk/i,
    'steal': /steal/i,
    'nightly': /nightly/i,
    'assist': /assist/i,
    'block': /block/i,
    'recap': /recap/i,
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
  },

  getConvert: function(str) {
    str = str === null ? '' : String(str);

    if (str === '') {
      return str;
    }

    return str.replace(/Magic/ig, '魔術')
      .replace(/Lakers/ig, '湖人')
      .replace(/Bucks/ig, '公鹿')
      .replace(/Hornets/ig, '黃蜂')
      .replace(/Pistons/ig, '活塞')
      .replace(/(Brooklyn )?Nets/ig, '籃網')
      .replace(/Celtics|Celtic/ig, '塞爾蒂克')
      .replace(/Cleveland|Cavaliers|Cavs/ig, '騎士')
      .replace(/Heat/ig, '熱火')
      .replace(/Sixers|76ers/ig, '76人')
      .replace(/(Nueva York|Knicks)/ig, '尼克')
      .replace(/Raptors/ig, '暴龍')
      .replace(/Jazz?/ig, '爵士')
      .replace(/Nuggets/ig, '金塊')
      .replace(/Kings/ig, '國王')
      .replace(/Timberwolves/ig, '灰狼')
      .replace(/Thunder/ig, '雷霆')
      .replace(/Hawks/ig, '老鷹')
      .replace(/Grizzli?es/ig, '灰熊')
      .replace(/Pacers/ig, '溜馬')
      .replace(/Spurs/ig, '馬刺')
      .replace(/Mavericks?|Mavs/ig, '小牛')
      .replace(/Bobcats/ig, '山貓')
      .replace(/(Los Bulls|Bulls)/ig, '公牛')
      .replace(/(Trail )?Blazers/ig, '拓荒者')
      .replace(/Clippers/ig, '快艇')
      .replace(/Suns?(?!day)/ig, '太陽')
      .replace(/Rockets/ig, '火箭')
      .replace(/Wizards?|Wizzards/ig, '巫師')
      .replace(/Warriors/ig, '勇士')
      .replace(/Sky/ig, '天空')
      .replace(/Storm/ig, '風暴')
      .replace(/Liberty/ig, '自由人')
      .replace(/Lynx/ig, '山貓')
      .replace(/Mercury/ig, '水星')
      .replace(/Shock/ig, '震動')
      .replace(/Sparks/ig, '火花')
      .replace(/Dream/ig, '美夢')
      .replace(/Mystics/ig, '神秘')
      .replace(/Silver Stars/ig, '銀星')
      .replace(/Fever/ig, '狂熱')
      .replace(/Pelicans|NOP/ig, '鵜鶘');
  }
};

