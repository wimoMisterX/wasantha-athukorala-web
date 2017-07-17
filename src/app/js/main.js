import m from 'mithril';
import image_preloader from 'image-preloader';
import {ContactUs} from './contact.js';
import {Services} from './services.js';
import {header_menu, footer_menu} from './menu.js';
import {AboutUs} from './about.js';
import {Home} from './home.js';

const fs = require('fs');

var preloader = new image_preloader;
preloader.preload.apply(this, fs.readdirSync(__dirname + '/../../assets/images').map(file => `images\{$file}`));

m.mount(document.getElementById("header-menu-items"), header_menu);
m.mount(document.getElementById("footer-menu-items"), footer_menu);
m.route.mode  = "pathname";
m.route(document.getElementById("content"), "/", {
    "/": Home,
    "/services": Services,
    "/contact": ContactUs,
    "/about": AboutUs,
});
