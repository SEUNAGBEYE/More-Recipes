import nodemailer from 'nodemailer';

/**
 *
 *
 * @param {string} email
 * @param {string} resetLink
 * @param {string} fullName
 * @returns {obj} obj
 */
function mailer(email, resetLink, fullName) {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'agbeyeseun1@gmail.com', // generated ethereal user
        pass: 'mother1234' // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Recipes 👻" <foo@blurdybloop.com>', // sender address
      to: email, // list of receivers
      subject: 'Forgot Password', // Subject line
      text: 'Hello world?', // plain text body
      html: `<h2>Hello ${fullName}, </h2>
              <p> You requested to reset your password because you forgot it, please 
                  click this <a href="${resetLink}">link</a> to reset your password
              </p>

              <p>The link above expires in 24hours, if you're not the one that requested to change your password
                  please ignore this message. Thank you.
              </p>

              <p>From Recipes Team</p>
            ` // html body
    };

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
}
export default mailer;
