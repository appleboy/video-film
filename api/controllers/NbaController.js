/**
 * NbaController
 *
 * @description :: Server-side logic for managing nbas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  latest: function (req, res) {
    Video.latest(req, function (error, data) {
      return res.json(data);
    });
  }
};

