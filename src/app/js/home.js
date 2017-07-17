import m from 'mithril';
import Flickity from 'flickity-imagesloaded';
import {home_content} from './content';

var Home = {
  controller: function() {
    this.render_flicky = function(ele, isInit) {
      if (isInit) return;
      new Flickity('.carousel', {
        adaptiveHeight: true,
        wrapAround: true,
        autoPlay: true,
        cellAlign: 'left',
        imagesLoaded: true,
      });
    }.bind(this);
  },
  view: ctrl => (
    m('div', [
      m('h2.text-center', 'Welcome!'),
      m('p.lead', home_content.welcome_text),
      m('.carousel', {config: ctrl.render_flicky}, home_content.image_playback.map(image => m('img.thumbnail', {src: image.image, alt: image.caption}))),
    ])
  )
};

export {
  Home,
};
