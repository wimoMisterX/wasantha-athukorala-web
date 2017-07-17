var m = require('mithril');

var about_content = require('./content').about_content;

var AboutUs = {
    view: function(){
        return m('div', [
            m('h2.text-center', 'Our Beginnings'),
            m('p.lead', about_content.our_beginnings),
            m('hr'),
            m('h2.text-center', 'Our Team'),
            m('p.lead', about_content.our_team),
            m('hr'),
            m('h2.text-center', 'Our mission'),
            m('p.lead', about_content.our_mission)
        ])
    }
}

module.exports = {
    AboutUs: AboutUs
};
