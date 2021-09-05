const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOSTMail,
            service: process.env.SERVICE,
            secureConnection: false, // use SSL
            port: 587, // port for secure SMTP
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USERNoReply,
            to: email,
            subject: subject,
            html: html,
        }, function(err){
            if(err)
                console.log(err);
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
        throw Error("email not sent")
    }
};

module.exports = sendEmail;