var m = require('mithril');
var _ = require('lodash');
var fs = require('fs');

var env = process.env.NODE_ENV;
var dev_settings = JSON.parse(fs.readFileSync(__dirname + '/../../../settings/dev/client_settings.json', 'utf8'));
var prod_settings = JSON.parse(fs.readFileSync(__dirname + '/../../../settings/prod/client_settings.json', 'utf8'));
var settings = env == 'dev' ? dev_settings : prod_settings;

function render_google_maps(element, isInit){
    if (isInit) return;
    var set_google_map = function(){
        if (window.google === undefined){
            setTimeout(set_google_map, 100);
        }else{
            var head_office = {lat: 6.344370, lng: 80.222378};
            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: head_office
            });
            var marker = new window.google.maps.Marker({
                position: head_office,
                map: map,
                title: 'Wasantha Athukorala Sole Propreitorship Head Office'
            });
        }
    };
    set_google_map();
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
                    'sitekey' : settings.recaptcha,
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
            m('h2.text-center', 'Need to contact us?'),
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
                    m('i#captcha_spinner.fa.fa-spinner.fa-spin.fa-3x')
                ]),
                m('div.row',
                    m('div.text-center',
                        m('button.button', {onclick: ctrl.save}, [
                            (ctrl.data.loading) ? m('i.fa fa-spinner.fa-spin.fa-lg', '') : '',
                            m('span', ' Submit')
                        ])
                    )
                ),
            ]),
            m('hr'),
            m('h2.text-center', {style: {'margin-top': '1em', 'margin-bottom': '1em'}}, 'Our Head Office'),
            m('.row.smal-up-1.medium-up-2.large-up-2', [
                m('.column', [
                    m('#map.thumbnail', {config: render_google_maps, style:{height: '400px', width: '100%'}}, m('i#captcha_spinner.fa.fa-spinner.fa-spin.fa-3x'))
                ]),
                m('.column',
                    m('table.hidden-table',
                        m('tbody', [
                            m('tr', [
                                m('td', m('i.fa.fa-map-marker.fa-2x')),
                                m('td', ['"Wasantha", Thotupala Road', m('br'), 'Pitigala, Sri Lanka'])
                            ]),
                            m('tr', [
                                m('td', m('i.fa.fa-phone.fa-2x')),
                                m('td', '+94 91 5 621206')
                            ]),
                            m('tr', [
                                m('td', m('i.fa.fa-envelope.fa-2x')),
                                m('td', m('a', {href: 'mailto:support@wasanthaathukorala.com'}, 'support@wasanthaathukorala.com'))
                            ]),
                            m('tr', [
                                m('td', m('i.fa.fa-clock-o.fa-2x')),
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
