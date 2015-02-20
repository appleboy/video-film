/**
* Base.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

'use strict';

module.exports = {
  limit: 30,
  page: 1,

  increase: function () {
    var args = Array.prototype.slice.call(arguments),
      cb = args.pop();

    if (_.isFunction(cb)) {
      args.push('+', cb);
    } else {
      args.push(cb, '+');
    }

    this._changeCount.apply(this, args);
  },

  decrease: function () {
    var args = Array.prototype.slice.call(arguments),
      cb = args.pop();

    if (_.isFunction(cb)) {
      args.push('-', cb);
    } else {
      args.push(cb, '-');
    }

    this._changeCount.apply(this, args);
  },

  _changeCount: function(column, key, str, cb) {
    this.query('update ' + this.tableName +' set ' + column + ' = ' + column + ' ' + str + ' 1 where id = "' + key + '"', function(err, res) {
      if (err) {
        return res.serverError(err);
      }

      return (cb) ? cb(res) : '';
    });
  }
};

