'use strict';
const port = 3001;
const hostname = 'localhost';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//bellow var are for sending email via nodemailer and SES from amazon webservices
var nodemailer = require('nodemailer');
//var ses = require('nodemailer-ses-transport');

var sendMailik = require('./sendMail.js')


// bellow this variables I was testing faker generator https://github.com/Marak/faker.js/blob/master/examples/node/minimal-usage.js
const faker = require('faker');
const limitation = 10;
faker.locate ='ger';
const generatedObj = [];
var t0,t1;


var SNS = {
        AWS_ACCESS_KEY: 'AKIAJOCZOVNLXBRTNRLQ',
        AWS_SECRET_KEY: 'cxWGQHShCvEzjYrZiKpkjyNyeo/SlzoDE1RJwUpp',
        REGION: 'eu-central-1',
        SMTP_Username:'AKIAIHYDE5HJGXLEJXHQ',
        SMTP_Password: 'AsKAYK9cpDfd5xsiYEqIpI61E8ttYkLYFB7O565IDg5Y',
        IAM_user:'ses-smtp-user.20170306-134204' //IAM user for SMTP authentication with Amazon SES 
       /* The new user will be granted the following IAM policy:
        "Statement": [{  "Effect":"Allow",  "Action":"ses:SendRawEmail",  "Resource":"*"}]*/
        };

        sendMailik.sendMailok();

/*
var transporter = nodemailer.createTransport(ses({
    accessKeyId: SNS.AWS_ACCESS_KEY,
    secretAccessKey: SNS.AWS_SECRET_KEY,
    REGION: 'eu-central-1',
    SMTP_Username:'AKIAIHYDE5HJGXLEJXHQ',
    SMTP_Password: 'AsKAYK9cpDfd5xsiYEqIpI61E8ttYkLYFB7O565IDg5Y',
    IAM_user:'ses-smtp-user.20170306-134204'
}));


transporter.sendMail({
    from: 'noreply@exfa.cloud',
    to: 'one4u2@gmail.com',
    subject: 'My Amazon SES Simple Email',
    text: 'Amazon SES is cool'
  });*/
/*


exports.submit = function (req, res) {

    var transport = nodemailer.createTransport("SMTP", { // Yes. SMTP!
        host: "email-smtp.eu-west-1.amazonaws.com", // Amazon email SMTP hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "AKIAIHYDE5HJGXLEJXHQ", // Use from Amazon Credentials
            pass: "AsKAYK9cpDfd5xsiYEqIpI61E8ttYkLYFB7O565IDg5Y" // Use from Amazon Credentials
        }
    });

    var mailOptions = {
        from: "Gabriel Manolache <gmanolache@exfa.cloud>", // sender address
        to: "Gabriel Manolache <one4u2@gmail.com.com>", // list of receivers
        subject: "User registerd", // Subject line
        html: "<b>New user registered!</b>" // email body
    };

    // send mail with defined transport object
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        transport.close(); // shut down the connection pool, no more messages
    });

    res.send('OK');
};*/


/*var nodemailer = require('nodemailer');
    var sesTransport = require('nodemailer-ses-transport');

    var SESCREDENTIALS = {
      accessKeyId : "AKIAJOCZOVNLXBRTNRLQ" ,
      secretAccessKey : "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"
    };

    var transporter = nodemailer.createTransport(sesTransport({
        accessKeyId: SESCREDENTIALS.accessKeyId,
        secretAccessKey: SESCREDENTIALS.secretAccessKey,
        region : "eu-west-1",
        rateLimit: 5
    }));



      var mailOptions = {
          from: 'FromName <test@exfa.cloud>',
          to: 'one4u2@gmail.com', // list of receivers
          subject: 'Amazon SES Template TesT', // Subject line
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

*/
























t0 = new Date().getTime();

function generateFakeObj(){

try{
	for(var i = 0 ; i < limitation; i++){
		var id = i;
		var record = {
			idrec : id,
			name :faker.name.findName(),
			email : faker.internet.email(),
			datum : faker.date.recent(),
			contextCard : faker.helpers.contextualCard()
		}   
		generatedObj.push(record);
		//console.log(`Record ${id} enetered`);

	}
}
catch (e){
	console.log(e);
}
};
function showObject(obj) {
  var result = "";
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result += p + " , " + obj[p] + "\n";
    } 
  }              
  return result;
}
//showObject(generatedObj);

generateFakeObj();

t1 = new Date().getTime();

generatedObj.forEach(doc => {
	console.log(`Record: ${doc.idrec} name: ${doc.name} email ${doc.email} datum: ${doc.datum}`)
});


/*function tada () {for (var i = 0 ; i < generatedObj.length + 1; i++) {
	
	console.log(i.);

}};*/


console.log(`Genereted ${limitation} takes ${t1 -t0} `);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());

let contacts = require('./data');



app.get('/api/contacts', (request, response) => {
	if (!contacts) {
		response.status(404).json({
			message: 'No contacts found.'
		});
	}
	response.json(contacts);
});



app.get('/api/contacts/:id', (request, response) => {

	let contactId = request.params.id;

	let contact = contacts.filter(contact => {
		return contact.id == contactId;
	});

	if (!contact) {
		response.status(404).json({
			message: 'Contact not found'
		});
	}

	response.json(contact[0]);

});



app.post('/api/contacts', (request, response) => {
	const contact = {
		id: contacts.length + 1,
		firstName: request.body.first_name,
		lastName: request.body.last_name,
		email: request.body.email,
		website: request.body.website

	}
	
	response.json(contact);
});



app.put('/api/contacts/:id', (request, response) => {

	let contactId = request.params.id;

	let contact = contacts.filter(contact => {
		return contact.id == contactId;
	})[0];

	const index = contacts.indexOf(contact);

	let keys = Object.keys(request.body);

	keys.forEach(key => {
		contact[key] = request.body[key];
	});

	contacts[index] = contact;

	// response.json({ message: `User ${contactId} updated.`});
	response.json(contacts[index]);
});

app.delete('/api/contacts/:id', (request, response) => {

	let contactId = request.params.id;

	let contact = contacts.filter(contact => {
		return contact.id == contactId;
	})[0];

	const index = contacts.indexOf(contact);

	contacts.splice(index, 1);

	response.json({
		message: `User ${contactId} deleted.`
	});

});




app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});