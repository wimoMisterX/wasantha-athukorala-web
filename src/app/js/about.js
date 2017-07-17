import m from 'mithril';

import {about_content} from './content';

var AboutUs = {
  view: () => (
    m('div', [
      m('h2.text-center', 'Our Beginnings'),
      m('p.lead', about_content.our_beginnings),
      m('hr'),
      m('h2.text-center', 'Our Team'),
      m('p.lead', about_content.our_team),
      m('hr'),
      m('h2.text-center', 'Our mission'),
      m('p.lead', about_content.our_mission)
    ])
  )
};

export {
  AboutUs
};
