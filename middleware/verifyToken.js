'use strict';
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var verifyToken = {

}

verifyToken.verify = function (req, res, next) {
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


module.exports = verifyToken;