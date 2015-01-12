/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var BaseModel = require('../services/BaseModel'),
  Promise = require('bluebird');

module.exports = _.merge(_.cloneDeep(BaseModel), {
  tableName: 'video_tag',
  attributes: {
    date : { type: 'date' },
    name : { type: 'string' },
    video : {
      columnName: 'video_id',
      type: 'integer',
      model: 'video'
    }
  },

  // get latest records
  videos: function(req, callback) {
    var limit = +req.param('limit') || this.limit,
      page = +req.param('page') || this.page,
      tag = req.param('tag') || '',
      countPromise = this.count({'name': tag }),
      findPromise = this.find({
          'name': tag
        }).populate('video')
        .paginate({page: page, limit: limit})
        .sort('id desc');

    Promise.props({
        total_counts: countPromise,
        videos: findPromise
    }).then(function(result) {
        callback(result);
    });
  }
});
