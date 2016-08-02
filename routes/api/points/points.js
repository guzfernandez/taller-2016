var express = require('express');
var morgan = require('morgan');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.get('/', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'SELECT id, descripcion, ST_AsGeoJSON(location) AS location FROM points;';
    /* +
    'WHERE ST_DWithin(p.location, ' +
    'Geography(ST_MakePoint(-71060316, 48.432044)), ' +
    '100);';*/
  var query = client.query(queryString);
  query.on('end', function (result) {
    client.end();
    var point = result;

    for (i=0; i<point.length; i++){
      //point = result.rows[i];
      point[i].location = JSON.parse(point['location']);
      console.log(point['descripcion']);
    }
    console.log("HOLAAA");
    res.send(point);
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
    point.location = JSON.parse(point['location']);
    res.send(point);
  });
});

module.exports = router;
