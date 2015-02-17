/**
* Number Helpers
*/

'use strict';

module.exports = {

  /**
  * {{addCommas}}
  *
  * Add commas to numbers
  * @param {[type]} number [description]
  */
  addCommas: function (number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  },

  /**
  * {{random}}
  * Generate a random number between two values
  * @author Tim Douglas <https://github.com/timdouglas>
  * @param {[type]} min [description]
  * @param {[type]} max [description]
  * @return {[type]} [description]
  */
  random: function (min, max) {
    return _.random(min, max);
  },

  toInt: function (number) {
    return parseInt(number, 10);
  }
};
