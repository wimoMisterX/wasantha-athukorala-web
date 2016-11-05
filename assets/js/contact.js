var m = require('mithril');

var ContactUs = {
    controller: function(){
        var ctrl = this;

        ctrl.user = {
            name:  '',
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
            m('h2', 'Contact Form'),
            m('form', {onsubmit: ctrl.post}, [
                m('input[type="text"][placeholder="Name"]', {
                    value: ctrl.user.name,
                    onchange: function(e){
                        ctrl.user.name = e.currentTarget.value;
                    }
                }),
                m('input[type="text"][placeholder="Message"]', {
                    value: ctrl.user.message,
                    onchange: function(e){
                        ctrl.user.message = e.currentTarget.value;
                    }
                }),
                (ctrl.err) ? m('p', ctrl.err) : '',
                (ctrl.success) ? m('p', ctrl.success) : '',
                m('button[type="submit"]', 'Log in'),
            ])
        ]);
    }
}

module.exports = {
    ContactUs: ContactUs
};
