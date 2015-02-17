/**
* Utility.js - api/services
*
*/

'use strict';

var utils = require('./utils'),
  moment = require('moment');

module.exports = _.assign({
  moment: moment
}, utils);
