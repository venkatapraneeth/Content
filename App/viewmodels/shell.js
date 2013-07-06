define(['durandal/system', 'durandal/plugins/router', 'config', 'dataservice'],
    function (system, router, config, dataService) {

        var username = ko.observable();

        var shell = {
            activate: activate,
            router: router,
            userName: username,
            viewAttached: viewAttached,
            ViewnName: ko.observable()
        };

        return shell;

        function activate() {
            router.map(config.routes);

            return router.activate(config.startModule);
        }

        function viewAttached() {
            debugger;
            dataService.getCurrentUserNameAsync().then(function (name1) {
                username(name1);
            }, function (sender, args) {
                //need to log errors here or need to alert user
            });
        }
    }
);