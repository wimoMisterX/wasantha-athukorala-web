var m = require('mithril');

var ContactUs = {
    controller: function(){
        var ctrl = this;
        ctrl.user = {
            name:  '',
            email: '',
            contact_num: '',
            message: ''
        };
        ctrl.err = '';
        ctrl.post = function(e){
            e.preventDefault();
            ctrl.success = 'Done !!';
        };
    },
    view: function(ctrl){
        return m('#Auth', [
            m('p.lead.text-center', 'Feel the need to contact us?'),
            m('form', {onsubmit: ctrl.post}, [
                m('div.row',
                    m('div.medium-6.medium-centered.columns',
                        m('label', [
                            'Name',
                            m('input[type="text"][placeholder="Name"]', {
                                value: ctrl.user.name,
                                onchange: function(e){
                                    ctrl.user.name = e.currentTarget.value;
                                }
                            })
                        ])
                    )
                ),
                m('div.row',
                    m('div.medium-6.medium-centered.columns',
                        m('label', [
                            'Email',
                            m('input[type="email"][placeholder="Email"]', {
                                value: ctrl.user.email,
                                onchange: function(e){
                                    ctrl.user.email = e.currentTarget.value;
                                }
                            })
                        ])
                    )
                ),
                m('div.row',
                    m('div.medium-6.medium-centered.columns',
                        m('label', [
                            'Contact Number',
                            m('input[type="text"][placeholder="Contact Number"]', {
                                value: ctrl.user.contact_num,
                                onchange: function(e){
                                    ctrl.user.contact_num = e.currentTarget.value;
                                }
                            })
                        ])
                    )
                ),
                m('div.row',
                    m('div.medium-6.medium-centered.columns',
                        m('label', [
                            'Message',
                            m('textarea[placeholder="Message"]', {
                                value: ctrl.user.message,
                                onchange: function(e){
                                    ctrl.user.message = e.currentTarget.value;
                                }
                            })
                        ])
                    )
                ),
                (ctrl.err) ? m('p', ctrl.err) : '',
                (ctrl.success) ? m('p', ctrl.success) : '',
                m('div.row',
                    m('div.medium-6.medium-centered.text-center.columns',
                        m('button.button[type="submit"]', 'Submit')
                    )
                ),
            ])
        ]);
    }
}

module.exports = {
    ContactUs: ContactUs
};
