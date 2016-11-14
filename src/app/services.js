var m = require('mithril');
var Flickity = require('flickity-imagesloaded');

var SAMPLE_PARAGRAPH = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var SERVICE_SET = [
    {title: 'Service Centres', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Hotels and Restaurants', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/hotel-1.jpg', caption: 'abc'}, {image: 'images/hotel-2.jpg', caption: 'cba'}]},
    {title: 'Shopping Complexes', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/shopping-1.jpg', caption: 'abc'}, {image: 'images/shopping-2.jpg', caption: 'cba'}]},
    {title: 'Tea Estates', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Warehousing Services', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Vehicle Transport', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Heavy Machinery Renting', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
];

function open_modal(title, details, slides){
    m.render(document.getElementById('modals'), create_modal(title, details, slides));
    var flky = new Flickity('.carousel', {
        adaptiveHeight: true,
        wrapAround: true,
        autoPlay: true,
        cellAlign: 'left',
        imagesLoaded: true,
    });
    var body = document.getElementsByTagName('body');
    body.className = 'is-reveal-open';
}

var close_modal = function(){
    setTimeout(function(){
        m.render(document.getElementById('modals'), null);
    }, 400);
    var modal = document.getElementsByClassName("reveal")[0]
    modal.className = "large reveal fade-out";
    var body = document.getElementsByTagName('body');
    body.className = '';
};

function create_modal(title, details, slides){
    return m('.reveal-overlay', {style: {display: 'block'}}, [
        m('.large.reveal.fade-in', {style: {display: 'block'}}, [
            m('h3', title),
            m('.carousel',
                slides.map(function(image){
                    return m('img.thumbnail', {src: image.image});
                })
            ),
            m('p.lead', details),
            m('button.close-button[type="button"]',{onclick: close_modal},
                m('span', m.trust('&times;'))
            )
        ])
    ]);
}

var Services = {
    view: function(){
        return m('div', [
            m('h2.text-center', 'We offer the following range of services'),
            m('#modals'),
            m('.row#services_navigation',
                SERVICE_SET.map(function(service){
                    return  m('.columns.small-centered',
                        m('span.label', m('a.text-center', {href: '#' + service.title.toLowerCase().replace(' ', '_')}, service.title))
                    );
                })
            ),
            SERVICE_SET.map(function(service){
                return m('.row.row-spacing',
                    m('.callout.secondary#'+ service.title.toLowerCase().replace(' ', '_'),
                        m('.row', [
                            m('.large-4.columns', m('img.thumbnail', {src: service.front_image})),
                            m('.large-8.columns', [
                                m('h3', service.title),
                                m('p.lead', [
                                    service.summary,
                                    m('a', {onclick: function(){open_modal(service.title, service.details, service.slides);}}, ' More Info..')
                                ])
                            ])
                        ])
                    )
                );
            })
        ]);
    }
}

module.exports = {
    Services: Services
};
