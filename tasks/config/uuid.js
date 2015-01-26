/**
 * Auto generate file name via using uuid format.
 *
 * ---------------------------------------------------------------
 *
 * https://github.com/broofa/node-uuid
 *
 * Simple, fast generation of RFC4122 UUIDS.
 */

var uuid = require('node-uuid');

module.exports = function() {

  if (global['uuid']) {
    return global['uuid'];
  }

  global['uuid'] = uuid.v4();

  return global['uuid'];
};
