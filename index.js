var express = require('express');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var request = require('request');
var favicon = require('serve-favicon');
var fs = require('fs');

var settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
var app = express();
var smtpTrans = nodemailer.createTransport('smtps://' + settings.mail.email  + ':' + settings.mail.password + '@smtp.gmail.com');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/src/assets'));
app.use(favicon(__dirname + '/src/assets/images/favicon.ico'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

app.post('/contact/send-mail', (req, res) => {
    var form_data = req.body;
    request.post('https://www.google.com/recaptcha/api/siteverify', {form: {secret: settings.recaptcha.secret, response: req.body.captcha}}, function(err, httpResponse, body){
        body = JSON.parse(body);
        if (err || !body.success){
            res.json({type: 'alert', message: 'Error occured, invalid captcha'});
        }else{
            var mailOpts = {
                from: 'Wasantha Athukorala Website <wimoappmailer@gmail.com>',
                to: '21440859@student.uwa.edu.au',
                subject: 'You have got a new message!',
                text: 'The following message was sent by ' + form_data.name + '\n' +
                      'Contact number is ' + form_data.contact_num + '\n' +
                      'Email is ' + form_data.email + '\n' +
                      'Message is ' + form_data.message
            }
            smtpTrans.sendMail(mailOpts, function(error, response){
                if (error){
                    res.json({type: 'alert', message: 'Error occured, message not sent'});
                }else{
                    res.json({type: 'success', message: 'Message sent! Thank you!'});
                }
            });
        }
    })
});

app.listen(3001, function(){
    console.log('Dev Server started at localhost:3001');
});
