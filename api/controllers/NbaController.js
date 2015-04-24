/**
 * NbaController
 *
 * @description :: Server-side logic for managing nbas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

var BluePromise = require('bluebird');

module.exports = {
  index: function (req, res) {
    Video.latest(req.allParams(), function (data) {
      return res.view('nba/index', data);
    });
  },

  list: function (req, res) {
    var tag = req.param('tag') || '',
      ajax = req.param('ajax') || false,
      channel = _.contains(req.path, 'channel');

    if (Utility.format.isEmpty(tag)) {
      return res.redirect('/');
    }

    Tag.videos(req.allParams(), function (data) {
      data = _.merge({title: Utility.tag.getValue(tag), tag: tag, channel: channel}, data);
      data = (ajax) ? _.merge(data, {layout: null}) : data;

      if (data.total_counts === 0) {
        return res.redirect('/');
      }

      return res.view(((ajax) ? 'partials/video' : 'nba/list'), data);
    });
  },

  show: function (req, res) {
    var nba_id = req.param('nba_id'),
      relatedPromise = Video.search({
        limit: 15,
        q: nba_id,
        promise: true
      }),
      findPromise = Video.findOne()
        .where({nba_id: nba_id});

    BluePromise.props({
      related: relatedPromise,
      video: findPromise
    }).then(function(result) {

      var rows = !_.isEmpty(result.related) ? result.related.hits.hits : [],
        videos = [];

      // check video exist
      if (typeof result.video === 'undefined') {
        return res.redirect('/');
      }

      _(rows).forEach(function(row) {
        var item = new Video._model(row._source);

        // ignore current video.
        if (item.nba_id === nba_id) {
          return;
        }

        videos.push(item);
      });

      // set title and description
      result.title = result.video.getTitleTR();
      result.description = result.video.description;
      result.videos = videos;

      // update view count
      Video.increase('view_counts', result.video.id);

      sails.sockets.blast('view_counts', {
        nba_id: result.video.nba_id,
        view_counts: +result.video.view_counts
      }, req.socket);

      return res.view('nba/show', result);
    });
  },

  search: function (req, res) {
    var q = req.param('q') || '',
      ajax = req.param('ajax') || false;

    if (Utility.format.isEmpty(q)) {
      return res.redirect('/');
    }

    Video.search(req.allParams(), function (data) {
      var total_counts = _.isEmpty(data) ? 0 : data.hits.total,
        rows = _.isEmpty(data) ? [] : data.hits.hits,
        videos = [];

      _(rows).map(function(row) {
        var item = new Video._model(row._source);

        videos.push(item);
      });

      data = {
        q: q,
        title: '搜尋關鍵字: ' + q,
        total_counts: Utility.numbers.addCommas(total_counts),
        response_time: (data.response_time || 0)/1000000,
        videos: videos
      };

      data = (ajax) ? _.merge(data, {layout: null}) : data;

      return res.view(((ajax) ? 'partials/video' : 'nba/search'), data);
    });
  },

  blast: function (req, res) {
    var nba_id = req.param('nba_id') || '',
      api_key = req.param('api_key') || '',
      api_password = req.param('api_password') || '';

    if (Utility.format.isEmpty(nba_id) || Utility.format.isEmpty(api_key) || Utility.format.isEmpty(api_password)) {
      return res.forbidden();
    }

    if (api_key !== process.env.API_KEY || api_password !== process.env.API_PASSWORD) {
      return res.forbidden();
    }

    Video.findOne()
      .where({nba_id: nba_id})
      .exec(function(err, video) {
        if (err) {
          return res.forbidden();
        }

        if (typeof video === 'undefined') {
          return res.redirect('/');
        }

        var data = {
          nba_id: video.nba_id,
          title: video.getTitleTR(),
          thumbnail: video.thumbnail
        };

        sails.sockets.blast('online_videos', data);

        return res.json(data);
      });
  }
};

