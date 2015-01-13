/**
 * format Method
 *
 */

module.exports = {

  isEmpty: function(str) {
    str = str === null ? '' : String(str).trim();

    return /^(\s+)?$/i.test(str);
  },

  isNumber: function(str) {
    str = str === null ? '' : String(str).trim();

    return /^-?\d+$/i.test(str);
  },

  isFloat: function(str) {
    str = str === null ? '' : String(str).trim();

    return /^-?\d+(\.?\d+)?$/i.test(str);
  },

  isDate: function(str) {
    str = str === null ? '' : String(str).trim();

    return /^\d{4}-\d{2}-\d{2}$/i.test(str);
  }
};
