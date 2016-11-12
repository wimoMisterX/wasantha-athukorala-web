var m = require('mithril');
var _ = require('lodash');
var google = window.google;

function render_google_maps(element, isInit){
    if (isInit) return;
    var uluru = {lat: 6.344370, lng: 80.222378};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Wasantha Athukorala Sole Propreitorship Head Office'
    });
}

function render_form_element(element, attr, title){
    return m('div.row',
        m('div',
            m('label', {className: (attr.error === '') ? '' : 'is-invalid-label'}, [
                title,
                m(element, {oninput: m.withAttr("value", attr.value), className: (attr.error === '') ? '' : 'is-invalid-input'}, attr.value()),
                (attr.error === '') ? '' : m('span.form-error.is-visible', attr.error)
            ])
        )
    );
}

var form = {
    getData: function(){
        return {
            name: {
                value: m.prop(""),
                error: ''
            },
            email: {
                value: m.prop(""),
                error: ''
            },
            contact_num: {
                value: m.prop(""),
                error: ''
            },
            message: {
                value: m.prop(""),
                error: ''
            },
            loading: false,
            post_result: m.prop({}),
            captcha: null
        };
    },
    setData: function(data){
        data.loading = true;
        if (data.name.value() === ''){
            data.name.error = 'Please enter a name';
        }
        if (data.email.value() === ''){
            data.email.error = 'Please enter a email';
        }
        if (data.message.value() === ''){
            data.message.error = 'Please enter a message';
        }
        if (data.name.value() !== '' && data.message.value() !== '' && data.email.value() !== ''){
            m.request({
                method: 'POST',
                background: true,
                url: '/contact/send-mail',
                data: {
                    name: data.name.value(),
                    contact_num: data.contact_num.value(),
                    email: data.email.value(),
                    message: data.message.value(),
                    captcha: window.grecaptcha.getResponse(data.captcha)
                }
            }).then(function(result){
                data.loading = false;
                data.post_result(result);
                if (result.type === 'success'){
                    data.name.value('');
                    data.email.value('');
                    data.contact_num.value('');
                    data.message.value('');
                }
                data.captcha = null;
                m.redraw.strategy("all");
                m.redraw();
            });
            return true;
        }
        return false;
    }
}

var ContactUs = {
    controller: function(){
        this.data = form.getData();
        this.save = function(e) {
            e.preventDefault();
            this.data.post_result({});
            if (!form.setData(this.data)){
                this.data.loading = false;
                window.grecaptcha.reset(this.data.captcha);
            }
        }.bind(this)
        var render_defer_captcha = function(passed_data){
            if (window.grecaptcha === undefined || passed_data.captcha !== null){
                setTimeout(render_defer_captcha, 100, passed_data);
            }else{
                passed_data.captcha = window.grecaptcha.render(document.getElementById('form_captcha'), {
                    'sitekey' : "6LdUxQsUAAAAABdymxIKFKrVW_0YG7C41AlsdNJZ",
                    'theme' : 'light'
                });
                document.getElementById('captcha_spinner').remove();
            }
        }
        this.renderCaptcha = function(element, isInit) {
            if (isInit) return;
            setTimeout(render_defer_captcha, 100, this.data);
        }.bind(this)
    },
    view: function(ctrl){
        return m('div', [
            m('h2.text-center', 'Feel the need to contact us?'),
            m('form', [
                (_.isEmpty(ctrl.data.post_result())) ? '' : m('div.row',
                    m('div', m('.callout.' + ctrl.data.post_result().type, m('p', ctrl.data.post_result().message)))
                ),
                render_form_element('input[type="text"][placeholder="Name"]', ctrl.data.name, 'Name'),
                render_form_element('input[type="email"][placeholder="Email"]', ctrl.data.email, 'Email'),
                render_form_element('input[type="text"][placeholder="Contact Number"]', ctrl.data.contact_num, 'Contact Number'),
                render_form_element('textarea[placeholder="Message"]', ctrl.data.message, 'Message'),
                m('div.row', [
                    m('.g-recaptcha#form_captcha', {config: ctrl.renderCaptcha}),
                    m('i#captcha_spinner.fa.fa-spinner.fa-spin.fa-5x')
                ]),
                m('div.row',
                    m('div.text-center',
                        m('button.button', {onclick: ctrl.save}, [
                            (ctrl.data.loading) ? m('i.fa fa-spinner.fa-spin.fa-fw', '') : '',
                            m('span', 'Submit')
                        ])
                    )
                ),
            ]),
            m('hr'),
            m('h2.text-center', {style: {'margin-top': '1em', 'margin-bottom': '1em'}}, 'Our Head Office'),
            m('.row', [
                m('.small-6.large-expand.columns', [
                    m('#map.thumbnail', {config: render_google_maps, style:{height: '400px', width: '100%'}})
                ]),
                m('.small-6.large-expand.columns',
                    m('table.hidden-table',
                        m('tbody', [
                            m('tr', [
                                m('td', m('i.fa.fa-map-marker')),
                                m('td', '"Wasantha", Thotupala Road')
                            ]),
                            m('tr', [
                                m('td', ''),
                                m('td', 'Pitigala, Sri Lanka')
                            ]),
                            m('tr', [
                                m('td', ''),
                                m('td', '')
                            ]),
                            m('tr', [
                                m('td', m('i.fa.fa-phone')),
                                m('td', '+94 91 5 621206')
                            ]),
                            m('tr', [
                                m('td', ''),
                                m('td', '')
                            ]),
                            m('tr', [
                                m('td', m('i.fa.fa-envelope')),
                                m('td', 'support@wasanthaathukorala.com')
                            ]),
                            m('tr', [
                                m('td', ''),
                                m('td', '')
                            ]),
                            m('tr', [
                                m('td', m('i.fa.fa-clock-o')),
                                m('td', 'Open 8am-5pm everyday except Mondays and Public Holidays')
                            ])
                        ])
                    )
                )
            ])
        ]);
    }
}

module.exports = {
    ContactUs: ContactUs
};
