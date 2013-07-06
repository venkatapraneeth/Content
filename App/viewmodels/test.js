define(function (require) {
    //debugger;
    //var ko = require('knockout');
    var models = require('models/models');
    var intialized = false;
    var name = ko.observable();
    var caseItem = new models.CorrespondenceListItem()
                                .caseName('Sample')
                                .caseNumber('100');
        //.extend({ required: true });
    var city = ko.observable();
        //.extend({ required: true });

    var showName = function () {
        this.errors.showAllMessages();
        //console.log(name);
    };
    debugger;
    //ko.validation.init();
    var vm = {
        activate:activate,
        Name: name,
        Show: showName,
        City: city,
        Case:caseItem
    };

    //vm['errors'] = ko.validation.group(vm, { deep: true });

    return vm;


    function activate() {
        if (intialized) {
            return;
        }
        intialized = true;
        //caseItem.caseName('Case Name');
    }

});





//define(function (require) {
//    var self = this;
//    var ko = require('knockout');
//    var name = ko.observable('knockout');


//    var vm = function () {
//        this.Name = name;
//        this.features = [
//            'Clean MV* Architecture',
//            'JS & HTML Modularity',
//            'Simple App Lifecycle',
//            'Eventing, Modals, Message Boxes, etc.',
//            'Navigation & Screen State Management',
//            'Consistent Async Programming w/ Promises',
//            'App Bundling and Optimization',
//            'Use any Backend Technology',
//            'Built on top of jQuery, Knockout & RequireJS',
//            'Integrates with other libraries such as SammyJS & Bootstrap',
//            'Make jQuery & Bootstrap widgets templatable and bindable (or build your own widgets).'
//        ];
//    };


//    vm.prototype.Show = function () {

//        debugger;
//        console.log(this.name);
//        console.log(this.Name());
//        console.log(name);
//    };




//    return vm;

//})