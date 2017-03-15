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


//setup SES transfer

var sender = 'FromName <test@exfa.cloud>';
var to = 'peter.haviar@protonmail.com';
var subject = 'Amazon SES Template TesT using module';
var mailMessage = "<h2>This is test message</h2><p>hello Peter from node js </p>";


//sendMailik.sendMailok(sender, to, subject, mailMessage );


























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

var isMomHappy = true;

// Promise
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // fulfilled
        } else {
            var reason = new Error('mom is not happy');
            reject(reason); // reject
        }

    }
);

/* ES5 */


// call our promise
var askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            console.log(fulfilled);
         // output: { brand: 'Samsung', color: 'black' }
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log(error.message);
         // output: 'mom is not happy'
        });
};

askMom();

var model = [];
var test = [1,2,2,45,6,];

function testArray(array){
for(var i = 0; i < array.length; i++) {
    if(array.indexOf(array[i]) === i) {
        model.push(array[i]);
    } else {
	   console.log('I found duplicate!')
	}
}
}

testArray(test);
console.log(model);


app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});