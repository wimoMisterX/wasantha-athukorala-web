var m = require('mithril');
var contact = require('./contact.js');
var services = require('./services.js');
var menu = require('./menu.js');

m.route.mode  = "pathname";
m.route(document.getElementById("content"), "/", {
    "/": menu.Menu,
    "/services": services.MyComponent,
    "/contact": contact.ContactUs,
});

var menus = document.getElementsByClassName("menu-items");
for (var i=0, im=menus.length; im>i; i++){
    m.mount(menus[i], menu.Menu);
}
