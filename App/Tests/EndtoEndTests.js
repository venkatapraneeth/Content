define(function (require) {
   
    var service = require('dataservice');
   
    QUnit.module("EndToEndTests", {
        setup: function () {
        },
        teardown: function () {
        }
    });
    
    QUnit.asyncTest("asynchronous test: invoke dataservice getCurrentUserNameAsync function", function () {
        expect(2);

        service.getCurrentUserNameAsync().then(function (namefrmServer) {
            QUnit.equals((namefrmServer.length > 1), true, namefrmServer);
            QUnit.equals((namefrmServer.indexOf("praneeth") > 1), true, "Current User Name Contains praneeth");
            start();
        }, function (sender, args) {
            //need to log server errors here or alert user
        });
    });
});
