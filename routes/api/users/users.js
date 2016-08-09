var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.get('/', function (req, res) {
  var client = pgClient.connect();
  var query = client.query('SELECT * FROM persona;'/*, [req.params.hola]*/);
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

router.post('/:idUser/:idPoint', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'INSERT INTO pointcheck(idUser, idPoint, checkdate) ' +
    'VALUES ($1, $2, CURRENT_TIMESTAMP);';
  var query = client.query(queryString, [req.params.idUser], [req.params.idPoint]);
  query.on('end', function () {
    client.end();
    res.send({
      success:true
    });
  });
});

module.exports = router;
