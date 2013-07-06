define(function (require) {
    var router = require('durandal/plugins/router');
         

    var initialized = false;
    var activate = function () {
        if (initialized) {
            return;
        }
        initialized = true;
    };

    var loadClearance = function () {
        var navto = '#/clearance';
        router.navigateTo(navto);
    };
    var vm = {
        activate: activate,
        SubmitforClearance: loadClearance
    };
    return vm;

});