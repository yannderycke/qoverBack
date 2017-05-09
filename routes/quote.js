var express = require('express');
var router = express.Router();
var connection = require('../db/connection');
var mailer = require('../mailing/mail.js');
var jwt = require('jsonwebtoken');


/* GET users listing. */
router.post('/', verifyToken, function (req, res, next) {
    // var login = req.sanitize('login').escape().trim();
    // var password = req.sanitize('password').escape().trim();
    var userLogin = req.body.userLogin;
    var valueOfCar = req.body.value;
    var price = req.body.price;
    var brand = req.body.brand.name;
    var name = req.body.userName;


    var query = connection.query("INSERT INTO `qover`.`quotes` (`userLogin`, `name`, `brand`, `valueOfCar`, `Price`) VALUES ('" + userLogin + "', '" + name + "', '" + brand + "', '" + valueOfCar + "', '" + price + "')", function (err, rows) {
        if (err) {
            res.end(res.writeHead(500, 'Error DB'));
        } else {
            mailer.create('gmail', 'yann.derycke@gmail.com', 'ggKanabeach2,');
            var html = '<p>Dear ' + name + ',</p><p>We confirm that you have bought an insurance contract for your ' + brand +
                ' which value is ' + valueOfCar + '.</p><p>The price to be paid is ' + price + '.</p> <p>Best regards,</p><p>QOVER';
            var mailOptions = {
                from: '"Yann Derycke" <yann.derycke@gmail.com>',
                to: 'yderycke@adneom.com',
                subject: 'Quote Qover',
                text: '',
                html: html
            };
            var confirm = mailer.sendMail(mailOptions);
            res.send(JSON.stringify(rows));
        }
    });
});

function verifyToken(req, res, next) {
    var token = req.headers.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
            req.body.userLogin = decode.login;
            if (err) {
                res.status(500).send('Invalid Token');
            } else {
                console.log('ok')
                next();
            }
        })
    } else {
        res.status(500).send('Issue Token');
    }
}

module.exports = router;