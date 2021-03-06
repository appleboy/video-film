/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

'use strict';

var BaseModel = require('../services/BaseModel'),
  BluePromise = require('bluebird');

module.exports = _.merge(_.cloneDeep(BaseModel), {
  tableName: 'video_tag',
  attributes: {
    date : { type: 'string' },
    name : { type: 'string' },
    video : {
      columnName: 'video_id',
      type: 'integer',
      model: 'video'
    }
  },

  // get latest records
  videos: function(param, callback) {
    var limit = +param.limit || this.limit,
      page = +param.page || this.page,
      tag = param.tag || '',
      promise = param.promise || false,
      where = where || {};

    if (tag !== '') {
      where = {
        'name': tag
      };
    }

    var countPromise = this.count(where),
      findPromise = this.find(where)
        .populate('video')
        .paginate({page: page, limit: limit})
        .sort('date desc')
        .sort('id desc');

    if (promise) {
      return BluePromise.props({
        total_counts: countPromise,
        videos: findPromise
      });
    } else {
      BluePromise.props({
        total_counts: countPromise,
        videos: findPromise
      }).then(function(result) {
        if (typeof callback === 'function') {
          callback(result);
        }
      });
    }
  }
});
