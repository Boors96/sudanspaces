const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require("nodemailer");

require("dotenv").config();



async function sendEmail(recever_email, recever_name, subject, msg, type) {
    let transporter = nodemailer.createTransport(smtpTransport({
        service: process.env.E_SERVICE,
        host: process.env.E_HOST,
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.E_PWD
        },
       
    }));

    let emailBody = ""
    if (type === 1) {
        emailBody = welcomeBody()
    } else {
        emailBody = recoverBody()
    }

    let mailOptions= {
        from: process.env.EMAIL, 
        to: recever_email, 
        subject: subject, 
        html: emailBody
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("EEEE"+error);
            return
        }
        console.log("Email sent : " + info.response);
    });

}

function welcomeBody(recever, msg){
    return "<h2>Sudanspaces</h2>"+
        `<h4>Welcome ${recever} to Sudanspaces</h4>`+
        "<p>Sudanspaces is a dynamic interactive map of sudan that connect assets, data and resources, for crucial stakeholders"+
        "We constantly stretching the possibilities of geospatial technologies enabling answers to questions in a wide range of domains;"+
        "urban ecosystems, water, infrastructure planning, economic development, public transit,"+
        "public safety, energy, natural resource management to name a few, we provide effective responsive and supportive "+
        "knowledge in order to meet our community needs for geo spatial issues and other applications"+
        "We are advocates of sustainable change.<br></p>"+
        `<h5>Your verification code : <h4>${msg}</h4></h5>`+
        "<p>Go back to our website and vrify your email.<br></p>"
}

function recoverBody(recever, msg) {
    return "<h2>Sudanspaces</h2>"+
        `<h4>${recever},</h4>`+
        "<p>To reset your password enter the verification code; to validate your identy"+
        "<br></p>"+
        `<h5>Your verification code : <h4>${msg}</h4></h5>`+
        "<p>Go back to our website and and continue reseting your password.<br>"+
        "<h5>Note:</h5> if you did not request to reset your password just ignore this email.</p>"
}

module.exports = sendEmail