define(function () {


    var routes = [{
        url: 'home',
        moduleId: 'viewmodels/home',
        name: 'Home',
        visible: true
    },
    {
        url: 'initiation',
        moduleId: 'viewmodels/initiation',
        name: 'Initiation',
        visible: true
    },
         {
             url: 'clearance',
             moduleId: 'viewmodels/clearance',
             name: 'clearance',
             visible: true
         },
        {
            url: 'test',
            moduleId: 'viewmodels/test',
            name: 'test',
            visible: true
        },
        {
            //assignowner
            url: 'assignowner',
            moduleId: 'viewmodels/assignowner',
            name: 'assignowner',
            visible: true
        },
        {
            //drafting
            url: 'drafting',
            moduleId: 'viewmodels/drafting',
            name: 'drafting',
            visible: true
        },
         {
             //closeout
             url: 'closeout',
             moduleId: 'viewmodels/closeout',
             name: 'closeout',
             visible: true
         }
    ];

    var startModule = 'home';

    return {
        routes: routes,
        startModule: startModule
    };
});
