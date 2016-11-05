var m = require('mithril');
var contact = require('./contact.js');
var services = require('./services.js');
var menu = require('./menu.js');

m.route.mode  = "pathname";
m.route(document.getElementById("content"), "/", {
    "/": services.MyComponent,
    "/services": services.MyComponent,
    "/contact": contact.ContactUs,
});

m.mount(document.getElementById("header-menu-items"), menu.header_menu);
m.mount(document.getElementById("footer-menu-items"), menu.footer_menu);
