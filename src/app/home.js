var m = require('mithril');
var Flickity = require('flickity-imagesloaded');

var SAMPLE_PARAGRAPH = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var IMAGE_SET = [
    {image: 'images/hotel-1.jpg', caption: 'Hotel 1'},
    {image: 'images/hotel-2.jpg', caption: 'Hotel 2'},
    {image: 'images/shopping-2.jpg', caption: 'Shopping 2'},
    {image: 'images/service-station.jpg', caption: 'Service Station 1'},
    {image: 'images/service-station-2.jpg', caption: 'Service Station 2'},
];

var Home = {
    controller: function(){
        this.render_flicky = function (ele, isInit){
            if (isInit) return;
            var flky = new Flickity('.carousel', {
                adaptiveHeight: true,
                wrapAround: true,
                autoPlay: true,
		cellAlign: 'left',
		imagesLoaded: true,
            });
        }.bind(this)
    },
    view: function(ctrl){
        return m('div', [
            m('h2.text-center', 'Welcome!'),
            m('p.lead', SAMPLE_PARAGRAPH),
            m('.carousel', {config: ctrl.render_flicky},
                IMAGE_SET.map(function(image){
                    return m('img.thumbnail', {src: image.image});
                })
            )
        ]);
    }
}

module.exports = {
    Home: Home
};
