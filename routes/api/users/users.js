var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.get('/ranking', function (req, res) {
  var client = pgClient.connect();
  var query = client.query('SELECT * FROM persona ORDER BY puntaje DESC;');
  query.on('end', function (result) {
    client.end();
    res.send(result.rows);
  });
});

router.get('/:nombre/details', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'SELECT * ' +
    'FROM persona '+
    'WHERE nombre = $1;';
  var query = client.query(queryString, [req.params.nombre]);
  query.on('end', function (result) {
    client.end();
    var persona = result.rows[0];
    res.send(persona);
  });
});

module.exports = router;
