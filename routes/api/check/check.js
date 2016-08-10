var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.post('/', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'INSERT INTO pointcheck(idUser, idPoint, idPartida, checkdate) ' +
    'VALUES ($1, $2, $3, CURRENT_TIMESTAMP)';
  var query = client.query(queryString, [req.query.user, req.query.point, req.query.partida]);
  query.on('end', function () {
    var query2 = client.query('UPDATE persona SET puntaje = (SELECT puntaje FROM persona WHERE id = $1) + 1 WHERE id = $1;', [req.query.user]);
    query2.on('end', function () {
      client.end();
      res.send({
        status: 'success'
      });
    });
  });
});

module.exports = router;
