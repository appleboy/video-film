/**
* Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var BaseModel = require('../services/BaseModel'),
  microtime = require('microtime'),
  Promise = require('bluebird'),
  elasticsearch = require('elasticsearch'),
  ElasticSearchClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

module.exports = _.merge(_.cloneDeep(BaseModel), {
  tableName: 'videos',
  attributes: {
    nba_id: {
      type: 'string',
      columnName: 'nba_id',
      size: 255
    },
    duration: {
      type: 'string',
      columnName: 'duration',
      size: 16
    },
    date: {
      type: 'date',
      columnName: 'date'
    },
    gameDate: function () {
      return Utility.moment(this.date).format('YYYY-MM-DD');
    },
    src: {
      type: 'string',
      columnName: 'src',
      size: 255
    },
    title: {
      type: 'string',
      columnName: 'title',
      size: 255
    },
    thumbnail: {
      type: 'string',
      columnName: 'thumbnail',
      size: 255
    },
    description: {
      type: 'string',
      columnName: 'description',
      size: 255
    },
    view_counts: {
      type: 'integer',
      columnName: 'view_counts',
      defaultsTo: 0
    },
    getViewCounts: function() {
      return Utility.numbers.addCommas(this.view_counts);
    },
    Tag: function() {
      return Utility.tag.getTR(this.nba_id);
    },
    tinyurl: 'string',
    url: 'string',
    share_url: 'string',
    comment: 'string',
    created_at: {
      type: 'datetime',
      columnName: 'created_at',
      defaultsTo: function (){ return new Date(); }
    },
    updated_at: {
      type: 'datetime',
      columnName: 'updated_at',
      defaultsTo: function (){ return new Date(); }
    }
  },

  // get latest records
  latest: function(param, callback) {
    var limit = +param.limit || this.limit,
      page = +param.page || this.page,
      countPromise = this.count(),
      findPromise = this.find()
        .paginate({page: page, limit: limit})
        .sort('id desc');

    Promise.props({
      total_counts: countPromise,
      videos: findPromise
    }).then(function(result) {
      callback(result);
    });
  },

  search: function(param, callback) {
    var limit = +param.limit || this.limit,
      page = +param.page || this.page,
      q = param.q || '',
      sort = param.sort || '',
      promise = param.promise || false,
      options = {
        index: 'video-film',
        from: (page - 1) * limit,
        size: limit,
        q: q.replace(/[-_\/]/ig, ' ').trim()
      };

    if (!Utility.format.isEmpty(sort)) {
      options = _.merge({sort: 'date:desc'}, options);
    }

    if (promise) {
      return ElasticSearchClient.search(options);
    }

    var now = microtime.now();
    ElasticSearchClient.search(options, function (err, response, status) {
      var end = microtime.now();
      var response_time = end - now;

      if (err) {
        return;
      }

      response['response_time'] = response_time;

      callback(response);
    });
  }
});
