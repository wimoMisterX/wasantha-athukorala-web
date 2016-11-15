var express = require('express');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var bodyParser = require('body-parser');
var request = require('request');
var favicon = require('serve-favicon');
var fs = require('fs');

var env = process.env.NODE_ENV;
var settings_root = env === 'prod' ? 'settings/prod' : 'settings/dev';
var settings = JSON.parse(fs.readFileSync(settings_root + '/server_settings.json', 'utf8'));
var mail_us_from_email = env === 'prod' ? '<support@wasanthaathukorala.com>' : '<wimoappmailer@gmail.com>';
var mail_us_to_email = env === 'prod' ? 'wasantha@wasanthaathukorala.com' : '21440859@student.uwa.edu.au';
var index_html = env === 'prod' ? '/src/index_prod.html' : '/src/index_dev.html';
fs.writeFile("settings/current_enviroment.txt", env);

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

var client_email_response =
    '***********************************\n' +
    'AUTO GENERATED MESSAGE     \n' +
    '***********************************\n\n' +
    'Thanks for filling out our form!\n'+
    'We will look over your message and get back to you by tomorrow.\n\n' +
    'Best Regards,\n' +
    'Wasantha Athukorala Sole Propreitorship Support Team\n\n';

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
                from: 'Wasantha Athukorala Website ' + mail_us_from_email,
                to: mail_us_to_email,
                subject: 'You have got a new message!',
                text: 'The following message was sent by ' + form_data.name + '\n' +
                      'Contact number is ' + form_data.contact_num + '\n' +
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
            var client_mail = {
                from: 'Wasantha Athukorala Website ' + mail_us_from_email,
                to: form_data.email,
                subject: 'Thank you for your message!',
                text: client_email_response
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
