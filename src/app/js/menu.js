var m = require('mithril');

function menu_item(name, route){
    var is_current = (m.route() === route);
    var click = function(){
        m.route(route);
    };
    return m("li", m("a" + (is_current ? ".is-active" : ""), {onclick: click}, name));
}

var menu_item_set = [
    {"label": "Home", "path": "/"},
    {"label": "Services", "path": "/services"},
    {"label": "About Us", "path": "/about"},
    {"label": "Contact Us", "path": "/contact"},
];

var header_menu = {
    view: function(){
        return menu_item_set.map(function(item){
            return menu_item(item.label, item.path);
        });
    }
};

var footer_menu = {
    view: function(){
        return menu_item_set.map(function(item){
            return menu_item(item.label, item.path);
        })
    }
};

module.exports = {
    header_menu: header_menu,
    footer_menu: footer_menu,
};
