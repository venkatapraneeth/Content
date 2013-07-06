/// <reference path="../app/durandal/amd/require.js" />
var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();
var oListParticipant = context.get_web().get_lists().getByTitle('Participants');
var userAddedToParticipantList;
// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    var ctListItemId = 1;
    getUsersFromSite();
    readItemFromParticipant(ctListItemId);
    addItemToParticpantList(ctListItemId, 'sp13-tx01\\joell', 'Owner');
});


function readItemFromParticipant(ctListItemId) {
    var oList = context.get_web().get_lists().getByTitle('Participants');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
        '<View><Query><Where><Eq><FieldRef Name=\'CtListItemId\'/>' +
        '<Value Type=\'Number\'>'+ctListItemId+'</Value></Eq></Where></Query>' +
      '</View>'
    );

    this.collListItem = oList.getItems(camlQuery);

    context.load(collListItem);
    context.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceededParticipants),
        Function.createDelegate(this, this.onQueryFailedParticipants)
    );

}

function onQuerySucceededParticipants(sender, args) {
    var item = '';
    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        item += oListItem.get_id() + " " + oListItem.get_item('Participant').get_lookupValue() + " " + oListItem.get_item('Title') + " " + oListItem.get_item('CtRole') + " " + oListItem.get_item('CtListItemId') + '\n';

    }
    alert(item);
}

function onQueryFailedParticipants(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

function addItemToParticpantList(ctListItemId, personLoginName, role) {
    //var user = new FieldUser();
    //user.set_lookupValue = personLoginName;
    var oList = context.get_web().get_lists().getByTitle('Participants');//use display name here
    var itemCreateInfo = new SP.ListItemCreationInformation();

    this.oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item('Title', getUserTitleFromLoginName(personLoginName));
    oListItem.set_item('CtListItemId', ctListItemId);//use internal name here
    oListItem.set_item('CtRole', role);
    oListItem.set_item('Participant', personLoginName);
    oListItem.update();

    context.load(oListItem);
    context.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceededCreateParticipant),
        Function.createDelegate(this, this.onQueryFailedCreateParticipant)
    );
}

function onQuerySucceededCreateParticipant() {
    alert('Item created: ' + oListItem.get_id());   
}

function onQueryFailedCreateParticipant(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

function getUserTitleFromLoginName(personLoginName) {
    var userObject = new SP.User(context, personLoginName);
    context.load(userObject);
    context.executeQueryAsync(onSuccessGetUserName(userObject), onFailureGetUserName);
}

function onSuccessGetUserName(userObject) {
   return userObject.get_title();
}
function onFailureGetUserName(){
    return "";
}
//Get all user login name and email from site
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();
    function getUsersFromSite() {
        var web = context.get_web();
        var userInfoList = web.get_siteUserInfoList();
        var camlQuery = new SP.CamlQuery();

        camlQuery.set_viewXml('<View></View>');

        this.collUsers = userInfoList.getItems(camlQuery);   
        context.load(collUsers,'Include(DisplayName,Id)');

        context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceededGetUsers), Function.createDelegate(this, this.onQueryFailedGetUsers));
    }

    //this returns groups and users - the list is not distinct
    function onQuerySucceededGetUsers() {
        var userInfo = [];
        var userEnumerator = collUsers.getEnumerator();
        while (userEnumerator.moveNext()) {
            var oUser = userEnumerator.get_current();
            userInfo.push(oUser.get_displayName());
        }
        
        alert(userInfo);
        return userInfo;
    }

    function onQueryFailedGetUsers(sender, args) {
        //var userLoginNames = [];
        //userLoginNames.push('sp13-tx01\\joell');
        //userLoginNames.push('sp13-tx01\\stevem');
        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
        //return userLoginNames;
    }