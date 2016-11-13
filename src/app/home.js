var m = require('mithril');

var Home = {
    view: function(){
        return m('div', [
            m('h2.text-center', 'Welcome to our website!'),
        ]);
    }
}

module.exports = {
    Home: Home
};
