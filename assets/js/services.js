var m = require('mithril');
var $ = window.$;
var Foundation = window.Foundation;

var SAMPLE_PARAGRAPH = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var SERVICE_SET = [
    {title: 'Service Stations', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Hotels and Resturants', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/hotel-1.jpg', caption: 'abc'}, {image: 'images/hotel-2.jpg', caption: 'cba'}]},
    {title: 'Shopping Complexes', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/shopping-1.jpg', caption: 'abc'}, {image: 'images/shopping-2.jpg', caption: 'cba'}]},
    {title: 'Tea Estates', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Warehousing Services', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Vehicle Transport', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
    {title: 'Heavy Machinery Renting', summary: SAMPLE_PARAGRAPH, front_image: 'images/sample.jpg', details: SAMPLE_PARAGRAPH, slides: [{image: 'images/service-station.jpg', caption: 'abc'}, {image: 'images/service-station-2.jpg', caption: 'cba'}]},
];

function open_modal(title, details, slides){
    m.render(document.getElementById('modals'), create_modal(title, details, slides));
    var orbit = new Foundation.Orbit($('#serviceOrbit'), {});
    var body = document.getElementsByTagName('body');
    body.className = 'is-reveal-open';
}

function close_manual_modal(){
    m.render(document.getElementById('modals'), null);
    var body = document.getElementsByTagName('body');
    body.className = '';
}

function create_modal(title, details, slides){
    return m('.reveal-overlay', {style: {display: 'block'}}, [
        m('.large.reveal', {style: {display: 'block'}}, [
            m('h3', title),
            create_orbit(slides),
            m('p.lead', details),
            m('button.close-button[type="button"]',{onclick: function(){close_manual_modal();}},
                m('span', m.trust('&times;'))
            )
        ])
    ]);
}

function create_orbit_slides(slides){
    return slides.map(function(slide, slide_no){
        return m('li.orbit-slide', {className: (slide_no === 0) ? 'is-active' : ''}, [
            m('img.orbit-image', {src: slide.image, style: {height: '800px'}}),
            m('figcaption.orbit-caption', slide.caption)
        ]);
    });
}

function create_orbit_navigation(slides){
    return m('nav.orbit-bullets',
        slides.map(function(slide, slide_no){
            return m('button', {className: (slide_no === 0) ? 'is-active' : '', 'data-slide': slide_no}, [
                m('span.show-for-sr', slide_no.toString() + ' Slide'),
                (slide_no === 0) ? m('span.show-for-sr', 'Current Slide') : ''
            ]);
        })
    )
}

function create_orbit(slides){
    return m('div.orbit#serviceOrbit', {'role': 'region', 'data-orbit': true}, [
        m('ul.orbit-container', {style: {height: '800px'}}, [
            m('button.orbit-previous', [
                m('span.show-for-sr', 'Previous Slide'),
                m.trust('&#9664;&#xFE0E;')
            ]),
            m('button.orbit-next', [
                m('span.show-for-sr', 'Next Slide'),
                m.trust('&#9654;&#xFE0E;')
            ]),
            create_orbit_slides(slides)
        ]),
        create_orbit_navigation(slides)
    ]);
}

var Services = {
    view: function(){
        return m('div', [
            m('h2.text-center', 'We proudly offer the following services'),
            m('#modals'),
            m('.row.small-up-3.medium-up-4.large-up-7',
                SERVICE_SET.map(function(service){
                    return m('.column',
                        m('p.lead', m('a', {href: '#' + service.title.toLowerCase().replace(' ', '_')}, service.title))
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
