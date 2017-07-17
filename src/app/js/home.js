var m = require('mithril');
var Flickity = require('flickity-imagesloaded');
var home_content = require('./content').home_content;

var Home = {
    controller: function(){
        this.render_flicky = function (ele, isInit){
            if (isInit) return;
            new Flickity('.carousel', {
                adaptiveHeight: true,
                wrapAround: true,
                autoPlay: true,
                cellAlign: 'left',
                imagesLoaded: true,
            })
        }.bind(this)
    },
    view: function(ctrl){
        return m('div', [
            m('h2.text-center', 'Welcome!'),
            m('p.lead', home_content.welcome_text),
            m('.carousel', {config: ctrl.render_flicky},
                home_content.image_playback.map(function(image){
                    return m('img.thumbnail', {src: image.image, alt: image.caption});
                })
            )
        ]);
    }
}

module.exports = {
    Home: Home
};
