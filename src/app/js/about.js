var m = require('mithril');

var SAMPLE_PARAGRAPH = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var AboutUs = {
    view: function(){
        return m('div', [
            m('h2.text-center', 'Our Beginnings'),
            m('p.lead', SAMPLE_PARAGRAPH),
            m('hr'),
            m('h2.text-center', 'Our Team'),
            m('p.lead', SAMPLE_PARAGRAPH),
            m('hr'),
            m('h2.text-center', 'Our mission'),
            m('p.lead', SAMPLE_PARAGRAPH)
        ])
    }
}

module.exports = {
    AboutUs: AboutUs
};
