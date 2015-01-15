/**
 * NbaController
 *
 * @description :: Server-side logic for managing nbas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var transformation = require('../services/utils/transformations'),
  format = require('../services/utils/format'),
  Promise = require('bluebird');

module.exports = {
  index: function (req, res) {
    var ajax = _.contains(req.path, 'ajax');

    Tag.videos(req, function (data) {
      data = (ajax) ? _.merge(data, {layout: null}) : data;

      return res.view('nba/index', data);
    });
  },

  list: function (req, res) {
    var tag = req.param('tag') || '';
      ajax = _.contains(req.path, 'ajax'),
      top_plays = _.contains(req.path, 'top_plays');

    if (tag === '') {
      return res.redirect('/');
    }

    Tag.videos(req.allParams(), function (data) {
      data = _.merge({title: transformation.ReplaceTag(tag), tag: tag, top_plays: top_plays}, data);
      data = (ajax) ? _.merge(data, {layout: null}) : data;

      if (data.total_counts === 0) {
        return res.redirect('/');
      }

      return res.view(((ajax) ? 'partials/video' : 'nba/list'), data);
    });
  },

  show: function (req, res) {
    var nba_id = req.param('nba_id') || '',
      type = req.param('type') || '',
      tag = req.param('tag') || transformation.getStringTag(nba_id);

    if (format.isEmpty(nba_id) || format.isEmpty(type)) {
      return res.redirect('/');
    }

    var relatedPromise = Tag.videos({limit: 10, tag: tag, promise: true}),
      findPromise = Video.findOne()
        .where({nba_id: nba_id});

    Promise.props({
      related: relatedPromise,
      video: findPromise
    }).then(function(result) {

      // check video exist
      if (typeof result.video === 'undefined') {
        return res.redirect('/');
      }

      // set title and description
      result.title = result.video.title;
      result.description = result.video.description;

      // update view count
      Video.increase('view_counts', result.video.id);

      sails.sockets.blast('view_counts', {
        nba_id: result.video.nba_id,
        view_counts: +result.video.view_counts
      }, req.socket);

      res.view('nba/show', result);
    });
  }
};

