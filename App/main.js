require.config({
    paths: {
        "text": "durandal/amd/text",
        "dataservice": "services/dataservice",
        "spService": "services/fakes/fakeSPServiece",
        "knockout": "../Scripts/knockout-2.2.1",
        "knockoutValidation": "../Scripts/knockout.validation",
        "bootStrap": "../Scripts/bootstrap",
        "jquery": "../Scripts/jquery-1.7.2.min",
        "toolTip": "bindinghandler/TooltipBindingHadler",
        "fileUpload": "bindinghandler/FileUploadBindingHandler",
        "Q": "durandal/plugins/q.min",
        "CurrentUserName": "services/CurrentUserName",
        "models": "models/models",
        "ServiceManager": "services/ServiceManager"
    }

});

define(function (require) {
    var system = require('durandal/system'),
        app = require('durandal/app'),
        router = require('durandal/plugins/router'),
        viewLocator = require('durandal/viewLocator');

    system.debug(true);

    system.defer = function (action) {
        var deferred = Q.defer();
        action.call(deferred, deferred);
        var promise = deferred.promise;
        deferred.promise = function () {
            return promise;
        };
        return deferred;
    };



    app.start().then(function () {
        // route will use conventions for modules
        // assuming viewmodels/views folder structure
        router.useConvention();

        // When finding a module, replace the viewmodel string 
        // with view to find it partner view.
        // [viewmodel]s/sessions --> [view]s/sessions.html
        // Otherwise you can pass paths for modules, views, partials
        // Defaults to viewmodels/views/views. 
        viewLocator.useConvention();

        app.setRoot('viewmodels/shell', 'entrance');

    });

});