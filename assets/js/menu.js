var m = require('mithril');

function menu_item(name, route){
    var is_current = (m.route() === route);
    var click = function(){
        m.route(route);
    };
    return m("a" + (is_current ? ".item .active" : ".item"), {onclick: click}, name);
}

var Menu = {
    view: function(){
        return [
            menu_item("Home", "/"),
            menu_item("Services", "/services"),
            menu_item("Our Work", "/our-work"),
            menu_item("About Us", "/about-us"),
            menu_item("Contact", "/contact"),
        ];
    }
}

module.exports = {
    Menu: Menu
};
