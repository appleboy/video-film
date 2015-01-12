/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'users',
  attributes: {
    email: {
      type: 'email',
      unique: true,
      required: true,
      email: true,
      columnName: 'email'
    },
    password: {
      type: 'string',
      minLength: 6,
      columnName: 'password'
    },
    first_name: {
      type: 'string',
      columnName: 'first_name',
      minLength: 1,
      maxLength: 15
    },
    last_name: {
      type: 'string',
      columnName: 'last_name',
      minLength: 1,
      maxLength: 100
    },
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

  /**
   * Lifecycle Callbacks
   *
   * Run before and after various stages:
   *
   * beforeValidate
   * afterValidate
   * beforeUpdate
   * afterUpdate
   * beforeCreate
   * afterCreate
   * beforeDestroy
   * afterDestroy
   */

  beforeCreate: function(attrs, cb) {
    var bcrypt = require('bcrypt');

    if (attrs.password === '') {
      return cb();
    }

    // async
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return cb(err);
      }

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        attrs.password = hash;
        cb();
      });
    });
  }
};
