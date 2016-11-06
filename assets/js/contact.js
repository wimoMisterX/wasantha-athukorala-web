var m = require('mithril');

var requestWithFeedback = function(args){
    var data = m.prop();
    args.background = true; // adding do request in background
    m.request(args).then(data).then(function(){
        m.redraw();
    });
    return {
        data: data,
        ready: function(){
            return !!data();
        }
    }
};

var ContactUs = {
    controller: function(){
        var ctrl = this;
        ctrl.user = {
            name:  '',
            email: '',
            contact_num: '',
            message: ''
        };
        ctrl.post_result = null;
        ctrl.post = function(e){
            e.preventDefault();
            ctrl.post_result = requestWithFeedback({method: "POST", url:"/contact/send-mail", data:{
                name: ctrl.user.name,
                contact_num: ctrl.user.contact_num,
                email: ctrl.user.email,
                message: ctrl.user.message
            }});
        };
    },
    view: function(ctrl){
        return m('#Auth', [
            m('p.lead.text-center', 'Feel the need to contact us?'),
            m('form', {onsubmit: ctrl.post}, [
                (ctrl.post_result !== null && ctrl.post_result.ready()) ? m('div.row',
                    m('div.medium-6.medium-centered.columns',
                        m('.callout.' + ctrl.post_result.data().type, m('p', ctrl.post_result.data().message))
                    )
                ) : '',
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
                m('div.row',
                    m('div.medium-6.medium-centered.text-center.columns',
                        m('button.button[type="submit"]', [
                            (ctrl.post_result !== null && !ctrl.post_result.ready()) ? m('i.fa fa-spinner fa-spin fa-fw', '') : '',
                            m('span', 'Submit')
                        ])
                    )
                ),
            ])
        ]);
    }
}

module.exports = {
    ContactUs: ContactUs
};
