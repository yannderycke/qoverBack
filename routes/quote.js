var express = require('express');
var router = express.Router();
var connection = require('../db/connection');
var mailer = require('../mailing/mail.js');


/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log("req ", req.body);


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

module.exports = router;