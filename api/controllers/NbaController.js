/**
 * NbaController
 *
 * @description :: Server-side logic for managing nbas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var transformation = require('../services/utils/transformations');

module.exports = {
  index: function (req, res) {
    var ajax = _.contains(req.path, 'ajax');

    Tag.videos(req, function (data) {
      data = (ajax) ? _.merge(data, {layout: null}) : data;

      return res.view('nba/index', data);
    });
  },

  show: function (req, res) {
    var tag = req.param('tag') || '';
      ajax = _.contains(req.path, 'ajax'),
      top_plays = _.contains(req.path, 'top_plays');

    if (tag === '') {
      return res.redirect('/');
    }

    Tag.videos(req, function (data) {
      data = _.merge({title: transformation.ReplaceTag(tag), tag: tag, top_plays: top_plays}, data);
      data = (ajax) ? _.merge(data, {layout: null}) : data;

      if (data.total_counts === 0) {
        return res.redirect('/');
      }

      return res.view(((ajax) ? 'partials/video' : 'nba/list'), data);
    });
  }
};

