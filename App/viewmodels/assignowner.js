define(function (require) {
    var router = require('durandal/plugins/router');
    var initialized = false;

    var activate = function () {
        if (initialized) {
            return;
        }
        initialized = true;
    };


    var submit = function () {
        var navto = '#/drafting';
        router.navigateTo(navto);
    };

    var vm = {
        activate: activate,
        OnSubmit: submit
    };

    return vm;


});