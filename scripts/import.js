'use strict';

var  elasticsearch = require('elasticsearch'),
  fs = require('fs'),
  client = new elasticsearch.Client({
    host: 'localhost:9200'
  });

var addRow = function(row) {
  client.exists({
    index: 'video-film',
    type: 'videos',
    id: row.id,
  }, function (error, exists) {
    if (exists === true) {
      console.log(row.id + ' item already exist.');
    } else {
      client.create({
        index: 'video-film',
        type: 'videos',
        id: row.id,
        body: row
      }, function (error, response) {
        console.log(response);
      });
    }
  });
};

fs.readFile( __dirname + '/fixtures/video.json', 'utf8', function (err, data) {
  if (err) {
    throw err;
  }
  var obj = JSON.parse(data);
  obj.forEach(function(row) {
    addRow(row);
  });
});


