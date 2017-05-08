'use strict';
const nodemailer = require('nodemailer');

var mailer = {

}
// create reusable transporter object using the default SMTP transport
mailer.create = function (service, user, pass) {
    this.connection =
        nodemailer.createTransport({
            service: service,
            auth: {
                user: user,
                pass: pass
            }
        })
}


mailer.sendMail = function (options) {
   return this.connection.sendMail(options, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

module.exports = mailer;