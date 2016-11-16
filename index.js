var express = require('express');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var bodyParser = require('body-parser');
var request = require('request');
var favicon = require('serve-favicon');
var hogan = require('hogan.js');
var fs = require('fs');

var env = process.env.NODE_ENV;
var settings_root = env === 'prod' ? 'settings/prod' : 'settings/dev';
var settings = JSON.parse(fs.readFileSync(settings_root + '/server_settings.json', 'utf8'));
var support_email = env === 'prod' ? '<support@wasanthaathukorala.com>' : '<wimoappmailer@gmail.com>';
var our_email = env === 'prod' ? 'wasantha@wasanthaathukorala.com' : '21440859@student.uwa.edu.au';
var index_html = env === 'prod' ? '/src/index_prod.html' : '/src/index_dev.html';

var app = express();

if (env === 'prod'){
    var smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: settings.mail.user,
                clientId: settings.mail.clientId,
                clientSecret: settings.mail.clientSecret,
                refreshToken: settings.mail.refreshToken,
                accessToken: settings.mail.accessToken
            })
        }
    });
}else{
    var smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: settings.mail.email,
            pass: settings.mail.password
        }
    });
}


smtpTrans.verify(function(error, succ){
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/src/assets'));
app.use(favicon(__dirname + '/src/assets/images/favicon.ico'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + index_html);
});

app.post('/contact/send-mail', (req, res) => {
    var form_data = req.body;
    request.post('https://www.google.com/recaptcha/api/siteverify', {form: {secret: settings.recaptcha.secret, response: req.body.captcha}}, function(err, httpResponse, body){
        body = JSON.parse(body);
        if (err || !body.success){
            res.json({type: 'alert', message: 'Error occured, invalid captcha'});
        }else{
            var company_mail = {
                from: 'Wasantha Athukorala Website ' + support_email,
                to: our_email,
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
                from: 'Wasantha Athukorala Sole Propreitorship ' + support_email,
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

app.listen(parseInt(process.env.PORT), function(){
    console.log((env == 'prod' ? 'Production ' : 'Development ') + 'Server started at localhost:' + process.env.PORT);
});
