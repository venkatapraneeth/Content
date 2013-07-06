
var context = SP.ClientContext.get_current();
var web = context.get_web();
var fileName, folderName, folderServerRelativeUrl;
var reader = new FileReader();
var fileContentStore;
var CtListItemId;
//This is currently for correspondence tracker list
//make it generic
function addItemToList(CorrespondenceListItem) {

    //TODO: get file name and folder Name from correspondence list item passed by interface.
    //CorrespondenceListItem.caseName;//folder name
    this.folderName = "test";
    fileContentStore = "thei sis test";//CorrespondenceListItem.file;//file object
    var oList = context.get_web().get_lists().getByTitle('CorrespondenceTrackerList');//use display name here
    var itemCreateInfo = new SP.ListItemCreationInformation();
  
    this.oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item('Title', 'test');//CorrespondenceListItem.caseName);
    oListItem.set_item('CorrespondenceTrackerStatus', 'Initiation');//use internal name here
    oListItem.set_item('DateResponseDue','06/25/2013');// CorrespondenceListItem.dateResponseDue);
    oListItem.set_item('CorrespondenceType', 'testCorrespondence');//CorrespondenceListItem.documentType);
    oListItem.update();

    context.load(oListItem);
    context.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceededCreate),
        Function.createDelegate(this, this.onQueryFailedCreate)
    );
}

function onQuerySucceededCreate() {
    alert('Item created: ' + oListItem.get_id());
    folderName = folderName + oListItem.get_id();
    var result = createFolder(folderName, oListItem.get_id());
   // document.location = "Default.aspx";
}

function onQueryFailedCreate(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

//TODO: modify this function so that it can create folder within folder using path
function createFolder(folderName,listItemId) {
    CtListItemId = listItemId;
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
    oListItem.set_item('CtListItemId', listItemId);
    this.oListItem.update();
    this.folderName = folderName;
    context.load(this.oListItem);
   context.executeQueryAsync(
        Function.createDelegate(this, successHandlerFolderCreation),
        Function.createDelegate(this, errorHandlerFolderCreation)
    );
}
    function successHandlerFolderCreation() {
        alert("folder created" + this.oListItem.get_id());       
        createFile(this.folderName,this.oListItem.get_id(),fileName,fileContentStore);

    }

    function errorHandlerFolderCreation() {
        alert("Request failed: " + arguments[1].get_message());
    }


//TODO: generalize this to add file either to initial, draft or supporting document folders-folderName could be folderName/draft or folderName/supporting or just folderName
    function createFile(folderName,id,fileName,fileContent) {
       
        var oList;
        var fileCreateInfo;
            
        oWebsite = web;
        if (folderName == undefined)
            folderName = "test";
        if (fileName == undefined)
            fileName = folderName + id;
        fileName = fileName;
        oList = oWebsite.get_lists().getByTitle("CorrespondenceTrackerDocuments");
        fileCreateInfo = new SP.FileCreationInformation();        
        fileCreateInfo.set_url('Lists/CorrespondenceTrackerDocuments/'+folderName+'/' + fileName);
        fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
        //if (fileContentStore != null) {
        //    fileContent = fileContentStore;
        //}
        if(fileContent==undefined)
            fileContent = "This is test content";
        

        for (var i = 0; i < fileContent.length; i++) {

            fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
        }

        this.newFile = oList.get_rootFolder().get_files().add(fileCreateInfo);
      
        context.load(newFile);
        context.executeQueryAsync(
            Function.createDelegate(this, successHandlerAddFile),
            Function.createDelegate(this, errorHandlerAddFile)
        );       
    }


//get the file item with this next query
    function successHandlerAddFile(sender,args) {
        alert("File created " + this.newFile);
        var camlQuery = new SP.CamlQuery.createAllItemsQuery();       
        camlQuery.set_viewXml("<View Scope='Recursive'><Query><Where><Contains><FieldRef Name='FileLeafRef'/><Value Type='Text'>" + this.newFile.get_name()+ "</Value></Contains></Where></Query></View>");
        var oListCTDocLib = context.get_web().get_lists().getByTitle('CorrespondenceTrackerDocuments');
        this.fileItems = oListCTDocLib.getItems(camlQuery);
        context.load(this.fileItems);
        context.executeQueryAsync(
       Function.createDelegate(this, this.onQuerySucceededFileUpdated), 
       Function.createDelegate(this, this.onQueryFailedFileUpdated)
   );
    }

//update metadat for the file item here
    function onQuerySucceededFileUpdated(sender,args) {
        var ListEnumerator = this.fileItems.getEnumerator();
        var fileType=getFileType(folderName);
        while (ListEnumerator.moveNext()) {
            var currentItem = ListEnumerator.get_current();
            currentItem.set_item('CtListItemId', CtListItemId);
           // currentItem.set_item('ContentType', 'CorrespondenceTrackerDocLibDocumentContentType');
            currentItem.set_item('CtFileType', fileType);
            currentItem.update();
        }
      
        context.executeQueryAsync(
            Function.createDelegate(this, this.onQuerySucceededItemUpdated),
            Function.createDelegate(this, this.onQueryFailedItemUpdated)
        );

    }
    function onQuerySucceededItemUpdated() {
        alert('Item updated!');
    }

    function onQueryFailedItemUpdated(sender, args) {
        alert('Request failed. ' + args.get_message() + 
            '\n' + args.get_stackTrace());
    }


    function onQueryFailedFileUpdated(sender, args) {
        alert('Request failed. ' + args.get_message() + 
            '\n' + args.get_stackTrace());
    }

    

    function errorHandlerAddFile() {
        alert("Request failed: " + arguments[1].get_message());

    }

   function getFileType(folderName){
       var fileType = 'Initiation';
       if (folderName == "Draft") {
           fileType = 'Draft';
       }
       else if (folderName == 'Supporting Documents') {
           fileType = 'Supporting';
       }
       return fileType;
    }




 