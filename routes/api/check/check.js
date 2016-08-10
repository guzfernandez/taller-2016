var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

/*router.post('/:idUser/:idPoint', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'INSERT INTO pointcheck(idUser, idPoint, checkdate) ' +
    'VALUES ($1, $2, CURRENT_TIMESTAMP)';
    var query = client.query(queryString, [req.params.idUser, req.params.idPoint]);
  query.on('end', function () {
    var query2 = client.query('UPDATE persona SET puntaje = (SELECT puntaje FROM persona WHERE id = $1) + 1 WHERE id = $1;', [req.params.idUser]);
    query2.on('end', function () {
      client.end();
      res.send({
        status: 'success'
      });
    });
  });
});*/

router.post('/', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'INSERT INTO pointcheck(idUser, idPoint, checkdate) ' +
    'VALUES ($1, $2, CURRENT_TIMESTAMP)';
  var query = client.query(queryString, [req.params.user, req.params.point]);
  query.on('end', function () {
    var query2 = client.query('UPDATE persona SET puntaje = (SELECT puntaje FROM persona WHERE id = $1) + 1 WHERE id = $1;', [req.params.user]);
    query2.on('end', function () {
      client.end();
      res.send({
        status: 'success'
      });
    });
  });
});

module.exports = router;
