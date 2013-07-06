define(function (require) {

    var router = require('durandal/plugins/router'),
        shell = require('viewmodels/shell');
    var title = ko.observable();
    var initialized = false;
    var active = function () {
        shell.ViewnName('Clearence');
        if (initialized) {
            return;
        }
        initialized = true;
    };

    var loadCloseOut = function () {
        var navto = '#/closeout';
        router.navigateTo(navto);
    };

    var vm = {
        Title: title,
        activate: active,
        OnSubmit: loadCloseOut
    };

    return vm;
});