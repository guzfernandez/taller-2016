var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.get('/', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'SELECT id, descripcion, ST_AsGeoJSON(location) AS location FROM points;';
  var query = client.query(queryString);
  query.on('end', function (result) {
    client.end();
    var point = result.rows;

    for(var i=0; i<point.length; i++){
      point[i].location = JSON.parse(point[i]['location']);
    }

    res.send(point);
  });
});

router.get('/:id/points', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'SELECT * FROM pointcheck WHERE idUser = $1;';
  var query = client.query(queryString, [req.params.id]);
  query.on('end', function (result) {
    client.end();
    res.send(result.rows);
  });
});

router.get('/:id/details', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'SELECT id, descripcion, ST_AsGeoJSON(location) AS location ' +
    'FROM points '+
    'WHERE id = $1;';
  var query = client.query(queryString, [req.params.id]);
  query.on('end', function (result) {
    client.end();
    var point = result.rows[0];
    if(point != null){
      point.location = JSON.parse(point['location']);
    }
    res.send(point);
  });
});

module.exports = router;
