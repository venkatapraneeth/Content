define(function (require) {
    var router = require('durandal/plugins/router'),
        shell = require('viewmodels/shell');
    var title = ko.observable();

    var initialized = false;
    var activate = function () {
        shell.ViewnName('Closeout');
        if (initialized) {
            return;
        }
        initialized = true;
    };


    var vm = {
        Title: title,
        activate: activate
    };
    return vm;

});