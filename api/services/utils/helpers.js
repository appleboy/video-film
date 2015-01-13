
/**
* Utility helpers
*/

/**
* _.str.capitalize
*
* @param {String} str
* @return {String}
* @api public
*/
exports.capitalize = function capitalize(str) {
  str = str === null ? '' : String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
* ignore
*/

exports.object = {};

/**
* Safer helper for hasOwnProperty checks
*
* @param {Object} obj
* @param {String} prop
* @return {Boolean}
* @api public
*/

var hop = Object.prototype.hasOwnProperty;
exports.object.hasOwnProperty = function(obj, prop) {
  if (obj === null) return false;
  return hop.call(obj, prop);
};
