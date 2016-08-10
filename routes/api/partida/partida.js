var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.post('/new', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'INSERT INTO partida(idUser, fecha) ' +
    'VALUES ($1, CURRENT_TIMESTAMP) returning id;';
  var query = client.query(queryString, [req.query.user]);
  query.on('end', function (result) {
    client.end();
    var point = result.rows[0];
    res.send(point);
  });
});

module.exports = router;
