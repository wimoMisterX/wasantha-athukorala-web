var express = require('express');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var app = express();
var smtpTrans = nodemailer.createTransport('smtps://wimoappmailer%40gmail.com:WimoAppMailer123@smtp.gmail.com');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
});

app.post('/contact/send-mail', (req, res) => {
    var mailOpts = {
        from: 'Wasantha Athukorala Website <wimoappmailer@gmail.com>',
        to: '21440859@student.uwa.edu.au',
        subject: 'You have got a new message!',
        text: 'The following message was sent by ' + req.body.name + '.' +
              'Contact number is ' + req.body.contact_num +
              'Email is ' + req.body.email +
              'Message is ' + req.body.message
    }
    smtpTrans.sendMail(mailOpts, function(error, response){
        if (error){
            res.json({type: 'alert', message: 'Error occured, message not sent'});
        }else{
            res.json({type: 'success', message: 'Message sent! Thank you!'});
        }
    });
});

app.listen(3001, function(){
    console.log('Dev Server started at localhost:3001');
});
