const nodemailer = require("nodemailer");
// HOSTMail = 'smtp.gmail.com'
// SERVICE = 'Gmail'
// USER = ''
// PASS = ''
// USERNoReply='noreply@drPizza.com'
const sendEmail = async (email, subject, html) => {
       const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'Gmail',
            secureConnection: false, // use SSL
            port: 587, // port for secure SMTP
            auth: {
                user: 'userEmail',
                pass: 'userEmailPass',
            },
        });

        await transporter.sendMail({
            from: 'noreply@drPizza.com',
            to: email,
            subject: subject,
            html: html,
        });
};

module.exports = sendEmail;