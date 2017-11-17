var express = require('express');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var request = require('request');
var favicon = require('serve-favicon');
var hogan = require('hogan.js');
var fs = require('fs');
var config = require('config');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('short'));
app.use(express.static(__dirname + '/src/assets'));
app.use(favicon(__dirname + '/src/assets/images/favicon.ico'));

var smtpTrans = nodemailer.createTransport(config.mailer);
smtpTrans.verify(function(error, succ){
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
})

function loadSPA(req, res) {
    var spa_file = fs.readFileSync(__dirname + '/src/index.html', 'utf8');
    var spa_template = hogan.compile(spa_file);
    res.send(spa_template.render({
        google_maps_api_key: config.google_maps_api_key,
        current_year: new Date().getFullYear(),
        version: process.env.WEBSITE_VERSION,
    }));
}

app.get('/', loadSPA);
app.get('/services', loadSPA);
app.get('/services', loadSPA);
app.get('/about', loadSPA);
app.get('/contact', loadSPA);

app.post('/contact/send-mail', (req, res) => {
    var form_data = req.body;
    request.post('https://www.google.com/recaptcha/api/siteverify', {form: {secret: config.recaptcha_server_key, response: req.body.captcha}}, function(err, httpResponse, body){
        body = JSON.parse(body);
        if (err || !body.success){
            res.json({type: 'alert', message: 'Error occured, invalid captcha'});
        }else{
            var company_mail = {
                from: 'Wasantha Athukorala Website ' + config.support_email,
                to: config.our_email,
                subject: 'You have got a new message!',
                text: 'The following message was sent by ' + form_data.name + '\n' +
                      'Contact number is ' + (form_data.contact_num || '-') + '\n' +
                      'Email is ' + form_data.email + '\n' +
                      'Message is ' + form_data.message
            }
            smtpTrans.sendMail(company_mail, function(error, response){
                if (error){
                    res.json({type: 'alert', message: 'Error occured, message not sent'});
                }else{
                    res.json({type: 'success', message: 'Message sent! Thank you!'});
                }
            });
            var email_file = fs.readFileSync(__dirname + '/src/thank_you_email.html', 'utf8');
            var email_template = hogan.compile(email_file);
            var client_mail = {
                from: 'Wasantha Athukorala Sole Propreitorship ' + config.support_email,
                to: form_data.email,
                subject: 'Enquriy at Wasantha Athukorala Sole Propreitorship',
                html: email_template.render({name: form_data.name})
            }
            smtpTrans.sendMail(client_mail, function(error, response){
                if (error){
                    console.log(error);
                }
            });
        }
    })
});

app.listen(process.env.PORT, function(){
    console.log(config.util.getEnv('NODE_ENV') + ' server started at localhost:' + process.env.PORT);
});
