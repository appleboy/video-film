/**
* Utility.js - api/services
*
*/

var utils = require('./utils'),
  moment = require('moment');

module.exports = _.assign({
  moment: moment
}, utils);
