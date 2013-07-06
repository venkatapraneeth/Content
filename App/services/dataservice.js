
define(['spService', 'models', 'CurrentUserName','ServiceManager'], function (spServiece, models, userService,servicemanager) {

    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();
    var web = context.get_web();

    var getCurrentUserName = function () {
        debugger;
        return servicemanager.UserService.GetCurrentUserName();
    };

   var getCaseItems = function () {
       return servicemanager.CaseService.GetCaseItems();
   };


    function onQuerySucceeded(sender, args, caseItemThis, cases) {
        var listItemInfo = '';
        var listItemEnumerator = caseItemThis.collListItem.getEnumerator();

        while (listItemEnumerator.moveNext()) {
            var oListItem = listItemEnumerator.get_current();
            var item = new models.CorrespondenceListItem(oListItem.get_id(), oListItem.get_item('CaseNumber'), oListItem.get_item('Title'), oListItem.get_item('CorrespondenceType'), oListItem.get_item('CorrespondenceTrackerStatus'), oListItem.get_item('DateResponseDue'), "");
            cases.push(item);

        }
        return cases;
    }

    function onQueryFailed(sender, args) {
        alert('Request failed. ' + args.get_message() +
            '\n' + args.get_stackTrace());
    }

    var caseStatusList = function() {
        var statuslist = [{ Name: "Open", Value: "Open" }, { Name: "Closed", Value: "Closed" }, { Name: "All", Value: "All" }];
        return statuslist;
    };

    var correspondenceTypeList = function() {

        var list = [{ Name: "Action Memo", Value: "Action Memo" },
            { Name: "Calendar", Value: "Calendar" },
            { Name: "General Correspondence", Value: "General Correspondence" },
            { Name: "Note", Value: "Note" },
            { Name: "Other Reading Material", Value: "Other Reading Material" },
            { Name: "utgoing-Only Correspondence", Value: "utgoing-Only Correspondence" },
            { Name: "Telephone Log", Value: "Telephone Log" }];
        return list;
    };


    var saveCorrespondenceItem = function (correspondenceItem) {//TODO: get file anme and file content and pass on to folder call
        this.folderName = correspondenceItem.caseName();
        fileContentStore = correspondenceItem.file();//CorrespondenceListItem.file;//file object
        var oList = context.get_web().get_lists().getByTitle('CorrespondenceTrackerList');//use display name here
        var itemCreateInfo = new SP.ListItemCreationInformation();

        this.oListItem = oList.addItem(itemCreateInfo);
        this.oListItem.set_item('Title', correspondenceItem.caseName());//CorrespondenceListItem.caseName);
        this.oListItem.set_item('CorrespondenceTrackerStatus', 'Initiation');//use internal name here
        this.oListItem.set_item('DateResponseDue', correspondenceItem.dateResponseDue());// CorrespondenceListItem.dateResponseDue);
        this.oListItem.set_item('CorrespondenceType', correspondenceItem.documentType());//CorrespondenceListItem.documentType);
        this.oListItem.update();
        var folderThis = this;
        context.load(this.oListItem);
        context.executeQueryAsync(
           function (sender, args) { onQuerySucceededCreate(folderThis); },
            function (sender, args) { onQueryFailedCreate; }
        );
    }

    function onQuerySucceededCreate(folderThis) {
        var listItemId = folderThis.oListItem.get_id();
        alert('Item created: ' + listItemId);
        var folderName = folderThis.folderName;//+ listItemId;
        var result = createFolder(folderName, listItemId);
        var saveResponse = { Status: 'Success' };
        return saveResponse;
        // document.location = "Default.aspx";
    }

    function onQueryFailedCreate(sender, args) {
        alert('Request failed. ' + args.get_message() +
            '\n' + args.get_stackTrace());
        var saveResponse = { Status: 'Failed' };
        return saveResponse;
    }

    function createFolder(folderName, listItemId) {

        var oList;
        var itemCreateInfo;
        oWebsite = web;
        if (folderName == undefined) {
            folderName = 'test' + listItemId;
        }
        oList = oWebsite.get_lists().getByTitle("CorrespondenceTrackerDocuments");
        itemCreateInfo = new SP.ListItemCreationInformation();
        itemCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
        itemCreateInfo.set_leafName(folderName);
        this.oListItem = oList.addItem(itemCreateInfo);
        this.oListItem.set_item('CtListItemId', listItemId);
        this.oListItem.update();
        this.folderName = folderName;
        context.load(this.oListItem);
        var fileThis = this;
        context.executeQueryAsync(
             function (sender, args) { successHandlerFolderCreation(fileThis); },
             function (sender, args) { errorHandlerFolderCreation; }
         );
    }
    function successHandlerFolderCreation(fileThis) {
        alert("folder created" + fileThis.oListItem.get_id());
        createFile(fileThis.folderName, fileThis.oListItem.get_id());

    }

    function errorHandlerFolderCreation() {
        alert("Request failed: " + arguments[1].get_message());
    }

    function createFile(folderName, id) {
        //todo: get file name from save method above and contents as well.
        var oList;
        var fileCreateInfo;
        var fileContent;
        oWebsite = web;
        if (folderName == undefined)
            folderName = "test";
        fileName = folderName + id;
        oList = oWebsite.get_lists().getByTitle("CorrespondenceTrackerDocuments");
        fileCreateInfo = new SP.FileCreationInformation();
        fileCreateInfo.set_url('Lists/CorrespondenceTrackerDocuments/' + folderName + '/' + fileName);
        fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
        if (fileContentStore != null) {
            fileContent = fileContentStore;
        }
        else {
            fileContent = "This is test content";
        }

        for (var i = 0; i < fileContent.length; i++) {

            fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
        }

        this.newFile = oList.get_rootFolder().get_files().add(fileCreateInfo);

        context.load(this.newFile);
        context.executeQueryAsync(
           function (sender, args) { successHandlerAddFile; },
           function (sender, args) { errorHandlerAddFile; }
        );
    }
    function successHandlerAddFile() {
        alert("File created " + this.newFile);
    }

    function errorHandlerAddFile() {
        alert("Request failed: " + arguments[1].get_message());

    }


    var getCaseDocuments = function (caseNumber) {
        return spServiece.GetCaseDocuments(caseNumber);
    };

    var addSuportingCaseDocument = function (doc) {

        //saving code goes here
        return true;
    };


    var getCaseParticipants = function (caseNumber) {
        return spServiece.GetCaseParticipants(caseNumber);
    };

    var addCaseParticipant = function (participant) {
        //saving code goes here
        return true;
    };


    //Get users from system
    var searchUser = function (users) {
        this.collGroup = context.get_web().get_siteGroups();
        userThis = this;
        context.load(this.collGroup, 'Include(Users.Include(Title,LoginName,Email))');
        context.executeQueryAsync(function (sender, args) { onQuerySucceededGetUsers(sender.args, userThis); },
                                  function (sender, args) { onQueryFailedGetUsers(sender, args); });
    };

    function onQuerySucceededGetUsers(sender, args, userThis) {
        var userInfo = '';

        var groupEnumerator = userThis.collGroup.getEnumerator();
        while (groupEnumerator.moveNext()) {
            var oGroup = groupEnumerator.get_current();
            var collUser = oGroup.get_users();
            var userEnumerator = collUser.getEnumerator();
            while (userEnumerator.moveNext()) {
                var oUser = userEnumerator.get_current();
                this.userInfo += '\nUser: ' + oUser.get_title() +
                    '\nLogin Name: ' + oUser.get_loginName();
            }
        }

        alert(userInfo);
    }

    function onQueryFailedGetUsers(sender, args) {
        var userLoginNames = [];
        userLoginNames.push({ name: 'joe, dane' });
        userLoginNames.push({ name: 'joe, shane' });
        // alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
        alert(userLoginNames);
        users = userLoginNames;
        return users;
    }


    var dataservice = {
        GetCaseItemsAsync: getCaseItems,
        getCurrentUserNameAsync: getCurrentUserName,
        getCaseStatusList: caseStatusList,
        getCorrespondenceTypeList: correspondenceTypeList,
        SaveCorrespondenceItem: saveCorrespondenceItem,
        GetCaseDocuments: getCaseDocuments,
        AddSuportingCaseDocument: addSuportingCaseDocument,
        GetCaseParticipants: getCaseParticipants,
        AddCaseParticipant: addCaseParticipant,
        SearchUser: searchUser
    };

    return dataservice;


});