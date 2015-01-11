/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'LocalMySQL',
  tableName: 'users',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email'
    },
    password: {
      type: 'string',
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
  }
};
