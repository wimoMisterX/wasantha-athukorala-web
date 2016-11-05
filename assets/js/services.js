var m = require('mithril');

var model = {count: 0};
var MyComponent = {
    controller: function(data){
        return {
            increment: function(){
                model.count++;
            }
        }
    },
    view: function(ctrl){
        return m("a[href=javascript:;]", {onclick: ctrl.increment}, "Count: " + model.count)
    }
}

module.exports = {
    MyComponent: MyComponent
};
