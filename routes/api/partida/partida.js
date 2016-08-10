var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.post('/new', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'INSERT INTO partida(idUser, fecha) ' +
    'VALUES ($1, CURRENT_TIMESTAMP)';
  var query = client.query(queryString, [req.params.user]);
  query.on('end', function () {
    var getId = client.query('SELECT LAST_INSERTED_ID();');
    getId.on('end', function (result) {
      client.end();
      //var point = result.rows;
      res.send(result.rows[0]);
    });
  });
});

module.exports = router;
