var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var prodconf = require('./config/config.prod.js');


module.exports = {
	//AWS SMTP credentials to access AWS SES service

	sendMailok: function (sender, to, subject, mailMessage){

		//var sender = sender;
		var transporter = nodemailer.createTransport(sesTransport({
			accessKeyId: prodconf.SES.AWS_ACCESS_KEY,
			secretAccessKey: prodconf.SES. AWS_SECRET_KEY,
			region : "eu-west-1",
			rateLimit: 5
		}));

		var mailOptions = {
		  from: sender,
          to: to, // list of receivers
          subject: subject, // Subject line
          html: mailMessage
      };

      // send mail with defined transport object
      
      transporter.sendMail(mailOptions, function(error, info){
      	if(error){
      		console.log(error);
      	}else{
      		console.log('Message sent: ' + info);
      	}
      });

  }

  


}