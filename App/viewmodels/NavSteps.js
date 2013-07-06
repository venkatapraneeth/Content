define(function (require) {
    debugger;
    var router = require('durandal/plugins/router'),
        models = require('models');

    var initialized = false;
    var navigationSteps = ko.observableArray([]);
    var activate = function () {
        if (initialized) {
            return;
        }
        navigationSteps(intializeNavBar());
        debugger;
    };

    var intializeNavBar = function () {

        //prameters
        //liclass, stepId, stepClass, stepValue, viewName, viewText, addTemplate
        //Adding home nav item
        var navItems = [];
        navItems.push(new models.Step('step active home', 'step-home', 'step-number current', 0, '#/home', 'Home', true));
        navItems.push(new models.Step('step fade', 'step-1', null, 1, '#/initiation', 'Initiation'));
        navItems.push(new models.Step('step noshow', 'step-2', null, 2, '#/assignowner', 'Assign Owner'));
        navItems.push(new models.Step('step noshow', 'step-3', null, 3, '#/drafting', 'Drafting'));
        navItems.push(new models.Step('step noshow', 'step-4', null, 4, '#/clearance', 'Clearance'));
        navItems.push(new models.Step('step noshow', 'step-5', null, 5, '#/closeout', "Closeout"));
        return navItems;
    };

    router.activeRoute.subscribe(function (value) {
        //classes, stepId, stepClass, stepValue, viewName, viewText, addTemplate
        //<li class="step active" id="step-1"><div class="step-number current">1</div><a href="#">Initiation</a></li>

        if (value) {
            var activeRouterItem = value;
            if (activeRouterItem.hash === "#/home") {
                navigationSteps([]);
                navigationSteps(intializeNavBar());
                return;
            }
            var activeNavItem = Enumerable.From(navigationSteps()).FirstOrDefault("Element Not Found", function (x) {
                return x.ViewnName() === activeRouterItem.hash;
            });

            if (activeNavItem !== "Element Not Found") {
                //Enumerable.From(navigationSteps()).Where(function (x) {
                //    return x.stepValue() >= activeNavItem.stepValue();
                //}).ForEach(function (obj) {
                //    debugger;
                //    obj.isDisadled(true);
                //});

                var previousNavItem = navigationSteps()[activeNavItem.stepValue() - 1];

                if (previousNavItem) {
                    previousNavItem.isDone(true);
                }
                activeNavItem.isActive(true);
                activeNavItem.addTemplate(true);
            }
        }
    });

    var vm = {
        activate: activate,
        navigationSteps: navigationSteps
    };
    return vm;


});