var m = require('mithril');
var Swiper = require('swiper');
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
            var mySwiper = new Swiper('.swiper-container', {
                loop: true,
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                paginationClickable: true,
				autoHeight: true,
                keyboardControl: true,
            });
        }.bind(this)
    },
    view: function(ctrl){
        return m('div', [
            m('h2.text-center', 'Welcome!'),
            m('p.lead.text-justify', SAMPLE_PARAGRAPH),
            m('.swiper-container', {config: ctrl.render_flicky}, [
                m('.swiper-wrapper',
                  IMAGE_SET.map(function(image){
                    return m('.swiper-slide', m('.wimo', [
                        m('.title', image.caption),
                        m('img', {src: image.image, alt: image.caption})
                    ]));
                  })
                ),
                m('.swiper-pagination'),
                m('.swiper-button-prev'),
                m('.swiper-button-next')
            ])
        ]);
    }
}

module.exports = {
    Home: Home
};
