const nodemailer = require('nodemailer');
const { AWS_SES_HOST, SES_PORT, SES_USER, SES_PASS } = require('../../env');

const transporter = nodemailer.createTransport({
  host: AWS_SES_HOST,
  port: SES_PORT,
  secure: true,
  auth: {
    user: SES_USER,
    pass: SES_PASS
  }
});

module.exports = {
  sendEmail: async (email, subject, message) => {
    var mailOptions = {
      from: '"Jelajah Travel" <jelajah@raditya.dev>',
      to: email,
      subject: subject,
      text: message
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  }
};
