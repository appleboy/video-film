/**
 * NbaController
 *
 * @description :: Server-side logic for managing nbas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  latest: function (req, res) {
    Video.latest(req, function (data) {
      return res.json(data);
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
      data = _.merge({tag: tag, top_plays: top_plays}, data);

      return (ajax) ? res.view('nba/list', _.merge(data, {layout: null})) : res.view('nba/list', data);
    });
  }
};

