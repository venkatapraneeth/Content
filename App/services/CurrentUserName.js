define(function () {
    var getUserName = function () {
        var deferred = $.Deferred();
        var context = SP.ClientContext.get_current();
        var user = context.get_web().get_currentUser();
        context.load(user);
        context.executeQueryAsync(
            Function.createDelegate(this, function () { deferred.resolve(user.get_title()); }),
            Function.createDelegate(this, function (sender, args) { deferred.reject(sender, args); })
        );
        return deferred.promise();
    };

    return {
        GetCurrentUserName: getUserName
    };
});