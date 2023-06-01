var nodemailer = require('nodemailer');

const WelcomeMail = async (Email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'userayushi121@gmail.com',
          pass: 'xociwlmfkpkgshlc'
        }
      });
      var mailOptions = {
        from: 'userayushi121@gmail.com',
        to: Email,
        subject: 'Successfully logged In',
        text: 'Welcome to our website.You are successfully logged in......'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent successfully!!!');
          // console.log('Email sent successfully!!!' + info.response);
        }
      });
    // if (process.env['ENVIRONMENT'] != 'PROD') return false;
   
  }
  const NewUserMail = async (Email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'userayushi121@gmail.com',
          pass: 'xociwlmfkpkgshlc'
        }
      });
      var mailOptions = {
        from: 'userayushi121@gmail.com',
        to: Email,
        subject: 'Created New Account Successfully',
        text: 'You have successfully created a new account.Now you can login with'+ Email
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent successfully for New User Registration!!!');
        }
      });
    // if (process.env['ENVIRONMENT'] != 'PROD') return false;
   
  }
  
  module.exports={WelcomeMail, NewUserMail};
  