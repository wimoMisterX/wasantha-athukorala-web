var m = require('mithril');
var image_preloader = require('image-preloader');
var preloader = new image_preloader;
var fs = require('fs');

var contact = require('./contact.js');
var services = require('./services.js');
var menu = require('./menu.js');
var about = require('./about.js');
var home = require('./home.js');

var image_set = fs.readdirSync(__dirname + '/../../assets/images').map(function(file) {
    return 'images/' + file;
});

preloader.preload.apply(this, image_set);
m.route.mode  = "pathname";
m.route(document.getElementById("content"), "/", {
    "/": home.Home,
    "/services": services.Services,
    "/contact": contact.ContactUs,
    "/about": about.AboutUs,
});

m.mount(document.getElementById("header-menu-items"), menu.header_menu);
m.mount(document.getElementById("footer-menu-items"), menu.footer_menu);
