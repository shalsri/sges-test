'use strict'

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(
    { 
        host: 'mail.appzera.in',
        port: 587,
        secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'support@appzera.in',
            pass: 'devsupport_20'
        }
    }
);

async function sendmail(sub, message, email){
   console.log("email", email);
   let info = await transporter.sendMail({
        from: 'support@appzera.in',
        to: email,
        subject: sub,
        text: message
    });

    console.log("Mail send info: " + info);
}

async function pSendPwd(sub, message, email){
    console.log("email pSendPwd", email);
    let info = await transporter.sendMail({
         from: 'support@appzera.in',
         to: email,
         subject: sub,
         text: message
    }); 
    
    console.log("Mail send info: " + info);
}

class email {

    send(subject, message, email){
        console.log("In function: email.send");
        console.log("**********", subject, message);
        return sendmail(subject, message, email);
    }

    sendPwd(subject, message, email){
        console.log("in function: email.sendPwd");
        console.log("*********", subject, message, email);
        return pSendPwd(subject, message, email);
    }
}

module.exports = email;