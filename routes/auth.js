var express = require('express');
var router = express.Router();
var connection = require('../db/connection')

/* GET users listing. */
router.post('/login', function (req, res, next) {


  // var login = req.sanitize('login').escape().trim();
  // var password = req.sanitize('password').escape().trim();
  var login = req.body.login;
  var password = req.body.password;
  var query = connection.query("SELECT * FROM qover.users WHERE login='" + login + "' and password=md5('" + password + "')", function (err, rows) {
    console.log("rows ", rows);

    if (err) {
      var errornya = ("Error Selecting : %s ", err.code);
      console.log(err.code);
      res.end(res.writeHead(500, 'Error DB'));
    } else {
      if (rows.length <= 0) {
        res.end(res.writeHead(400, 'Current password does not match'));
      } else {
        var user = rows[0];
        delete user['password']
        res.send(JSON.stringify(user));
      }
    }
  });
});

module.exports = router;