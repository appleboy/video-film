/**
* tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

'use strict';

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
    'play_season': '單季十大',
    'celtics': '波士頓塞爾蒂克 Boston Celtics',
    'nets': '布魯克林籃網 Brooklyn Nets',
    'knicks': '紐約尼克 New York Knicks',
    'sixers': '費城76人 Philadelphia 76ers',
    'raptors': '多倫多暴龍 Toronto Raptors',
    'bulls': '芝加哥公牛 Chicago Bulls',
    'cavaliers': '克里夫蘭騎士 Cleveland Cavaliers',
    'pistons': '底特律活塞 Detroit Pistons',
    'pacers': '印第安那溜馬 Indiana Pacers',
    'bucks': '密爾瓦基公鹿 Milwaukee Bucks',
    'hawks': '亞特蘭大老鷹 Atlanta Hawks',
    'bobcats': '夏洛特黃蜂 Charlotte Bobcats',
    'heat': '邁阿密熱火 Miami Heat',
    'magic': '奧蘭多魔術 Orlando Magic',
    'wizards': '華盛頓巫師 Washington Wizards',
    'rockets': '休士頓火箭 Houston Rockets',
    'grizzlies': '曼斐斯灰熊 Memphis Grizzlies',
    'pelicans': '紐奧良鵜鶘 New Orleans Pelicans',
    'spurs': '聖安東尼奧馬刺 San Antonio Spurs',
    'nuggets': '丹佛金塊 Denver Nuggets',
    'timberwolves': '明尼蘇達灰狼 Minnesota Timberwolves',
    'thunder': '奧克拉荷馬雷霆 Oklahoma City Thunder',
    'blazers': '波特蘭拓荒者 Portland Trail Blazers',
    'jazz': '猶他爵士 Utah Jazz',
    'warriors': '金州勇士 Golden State Warriors',
    'clippers': '洛杉磯快艇 Los Angeles Clippers',
    'lakers': '洛杉磯湖人 Los Angeles Lakers',
    'suns': '鳳凰城太陽 Phoenix Suns',
    'kings': '沙加緬度國王 Sacramento Kings'
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
  tags: ['top10', 'play_week', 'zap', 'dunk', 'steal', 'nightly', 'block', 'assist'],

  getValue: function(str) {

    str = str === null ? '' : String(str);

    return hop(tag_string, str) ? str.replace(str, tag_string[str]) : '';
  },

  getID: function (str, isRandom) {
    var tag;

    isRandom = isRandom || false;

    _.forEach(tag_rexp, function(value, key) {
      if (value.test(str)) {
        tag = key;
        return false;
      }
    });

    return tag ? tag : (isRandom) ? this.getRandom() : '';
  },

  getTR: function(str) {
    return this.getValue(this.getID(str));
  },

  getRandom: function () {
    return this.tags[_.random((this.tags.length - 1))];
  },

  getConvert: function(str) {
    str = str === null ? '' : String(str);

    if (str === '') {
      return false;
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

