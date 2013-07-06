define(function (require) {
    var userService = require('CurrentUserName'),
        caseService = require('services/CaseService');


    var manager = {
        UserService: userService,
        CaseService:caseService
    };
    return manager;
});