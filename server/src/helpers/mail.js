import nodemailer from 'nodemailer';
import handleBars from 'nodemailer-express-handlebars';

/**
 *@description - This is a mail function
 *
 * @param {Object} mailData Mail Details
 *
 * @returns {void} void
 */
const mailer = (mailData) => {
  const {
    email: to, subject, template, context
  } = mailData;
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: process.env.EMAIL, // sender address
      to, // list of receivers
      subject, // Subject line
      template,
      context
    };
    let viewPath;

    if (process.env.NODE_ENV === 'production') {
      viewPath = 'server/dist/email-templates';
    } else {
      viewPath = 'server/src/email-templates';
    }
    transporter.use('compile', handleBars({
      viewPath,
      extName: '.hbs'
    }));

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};

export default mailer;
