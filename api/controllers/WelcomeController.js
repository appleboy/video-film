/**
 * WelcomeController
 *
 * @description :: Server-side logic for managing welcomes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

module.exports = {
  index: function (req, res) {
    return res.view();
  }
};

