var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');

var SESCREDENTIALS = {
		accessKeyId : "AKIAJOCZOVNLXBRTNRLQ" ,
		secretAccessKey : "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"
	};


module.exports = {
	//AWS SMTP credentials to access AWS SES service

	





	sendMailok: function (){


		var transporter = nodemailer.createTransport(sesTransport({
			accessKeyId: SESCREDENTIALS.accessKeyId,
			secretAccessKey: SESCREDENTIALS.secretAccessKey,
			region : "eu-west-1",
			rateLimit: 5
		}));

		var mailOptions = {
			from: 'FromName <test@exfa.cloud>',
          to: 'one4u2@gmail.com', // list of receivers
          subject: 'Amazon SES Template TesT using module', // Subject line
          html: "<p>Mail message</p>" 
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