var express = require('express');
var pgClient = require('../../../utils/database_connection');
var router = express.Router();

router.get('/:idUser/:idPoint', function (req, res) {
  var client = pgClient.connect();
  var queryString = 'INSERT INTO pointcheck(idUser, idPoint, checkdate) ' +
    'VALUES ($1, $2, CURRENT_TIMESTAMP);';
  var query = client.query(queryString, [req.params.idUser], [req.params.idPoint]);
  query.on('end', function (result) {
    client.end();
  });
});

module.exports = router;
