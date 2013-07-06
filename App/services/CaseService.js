define(function (require) {

    var models = require('models');
    var deferred = $.Deferred();
    var context = SP.ClientContext.get_current();

    var getCaseItems = function() {
        var oList = context.get_web().get_lists().getByTitle('CorrespondenceTrackerList');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
            '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
                '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' +
                '</View>'
        );

        var items = oList.getItems(camlQuery);
        debugger;
        context.load(items);

        context.executeQueryAsync(
            Function.createDelegate(this, function() {
                var cases = [];
                var listItemEnumerator = items.getEnumerator();

                while (listItemEnumerator.moveNext()) {
                    var oListItem = listItemEnumerator.get_current();
                    var item = new models.CorrespondenceListItem(oListItem.get_id(), oListItem.get_item('CaseNumber'), oListItem.get_item('Title'), oListItem.get_item('CorrespondenceType'), oListItem.get_item('CorrespondenceTrackerStatus'), oListItem.get_item('DateResponseDue'), "");
                    cases.push(item);
                }

                deferred.resolve(cases);
            }),
            Function.createDelegate(this, function(sender, args) { deferred.reject(sender, args); })
        );

        return deferred.promise();
    };



    return {
        GetCaseItems: getCaseItems
    };

});