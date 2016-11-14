var m = require('mithril');

function create_orbit_slides(slides){
    return slides.map(function(slide, slide_no){
        return m('li.orbit-slide', {className: (slide_no === 0) ? 'is-active' : ''}, [
            m('img.orbit-image', {src: slide.image}),
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

var create_orbit = function (slides){
    return m('div.orbit#serviceOrbit', {'role': 'region', 'data-orbit': true}, [
        m('ul.orbit-container', [
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

module.exports = {
    create_orbit: create_orbit
};
