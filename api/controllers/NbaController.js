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

    if (tag === '') {
      return res.redirect('/');
    }

    Tag.videos(req, function (data) {
      return res.json(data);
    });
  }
};

