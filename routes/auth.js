var express = require('express');
var router = express.Router();
var connection = require('../db/connection');
var jwt= require('jsonwebtoken');
var sanitizer = require('sanitizer');

/* GET users listing. */
router.post('/login', function (req, res, next) {

  var login = sanitizer.sanitize(req.body.login);
  var password = sanitizer.sanitize(req.body.password);

  var query = connection.query("SELECT * FROM qover.users WHERE login='" + login + "' and password=md5('" + password + "')", function (err, rows) {
    if (err) {
      var errornya = ("Error Selecting : %s ", err.code);
      res.end(res.writeHead(500, 'Error DB'));
    } else {
      if (rows.length <= 0) {
        res.end(res.writeHead(400, 'Current password does not match'));
      } else {
        var user = rows[0];
        delete user['password']
        var token = jwt.sign(user, process.env.SECRET_KEY,{
          expiresIn: 4000
        })
        res.json({
          success: true,
          token: token,
          user: user
        });
      }
    }
  });
});

module.exports = router;