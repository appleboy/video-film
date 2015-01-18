/**
* Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var BaseModel = require('../services/BaseModel'),
  Promise = require('bluebird'),
  moment = require('moment'),
  numbers = require('../services/utils/numbers'),
  ElasticSearchClient = require('elasticsearchclient');

var serverOptions = {
  hosts:[{
    host: 'localhost',
    port: 9200
  }]
};

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
      return moment(this.date).format('YYYY-MM-DD');
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
      return numbers.addCommas(this.view_counts);
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
  latest: function(req, callback) {
    var limit = +req.param('limit') || this.limit,
      page = +req.param('page') || this.page,
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
      elasticSearchClient = new ElasticSearchClient(serverOptions)
      qryObj = {"query":
        {"bool":
          {"must":
            [{
              "query_string": {"default_field": "_all","query": q}
            }],
            "must_not": [],
            "should": []
          }
        },
        "from": (page - 1) * limit,
        "size": limit,
        "sort":[{ "date" : {"order" : "desc"}}],
        "facets":{}
      };

    var elasticSearchClient = new ElasticSearchClient(serverOptions);

    elasticSearchClient.search('video-film', 'videos', qryObj)
      .on('data', function(data) {
        var data = JSON.parse(data);
        callback(data);
      }).on('done', function(){
        //always returns 0 right now
      }).on('error', function(error){
        console.log(error);
      })
      .exec()
  }
});
