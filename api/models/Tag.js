/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
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
    var limit = +req.param('limit') || 10,
      page = +req.param('page') || 1,
      tag = req.param('tag') || ''

    return this.find({
        'name': tag
      })
      .populate('video')
      .paginate({page: page, limit: limit})
      .sort('id desc')
      .exec(callback);
  }
};

