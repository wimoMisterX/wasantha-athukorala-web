import m from 'mithril';
import Flickity from 'flickity-imagesloaded';
import {services_content} from './content';

function open_modal(title, details, slides){
  m.render(document.getElementById('modals'), create_modal(title, details, slides));
  new Flickity('.carousel', {
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
  setTimeout(() => {
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
      m('.carousel', slides.map(image => m('img.thumbnail', {src: image.image}))),
      m('p.lead', details),
      m('button.close-button[type="button"]', {onclick: close_modal}, m('span', m.trust('&times;')))
    ])
  ]);
}

var Services = {
  view: () => (
    m('div', [
      m('h2.text-center', 'We offer the following range of services'),
      m('#modals'),
      m('.row#services_navigation',
        services_content.services.map(service => (
          m('.columns.small-centered',
            m('span.label', m('a.text-center', {href: '#' + service.title.toLowerCase().replace(' ', '_')}, service.title))
          )
        ))
      ),
      services_content.services.map(service => (
        m('.row.row-spacing',
          m('.callout.secondary#'+ service.title.toLowerCase().replace(' ', '_'),
            m('.row', [
              m('.large-4.columns', m('img.thumbnail', {src: service.front_image})),
              m('.large-8.columns', [
                m('h3', service.title),
                m('p.lead', [
                  service.summary,
                  m('a', {onclick: open_modal.bind(null, service.title, service.details, service.slides)}, ' More Info..')
                ])
              ])
            ])
          )
        )
      ))
    ])
  )
};

export {
  Services
};
