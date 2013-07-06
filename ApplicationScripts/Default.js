
var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();
var oListCTDocLib = context.get_web().get_lists().getByTitle('CorrespondenceTrackerDocuments');
// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {  
   // readItemFromList();
    var ctListItemId = 1;
   // readItemFromCTDocLib(ctListItemId);
});

function goToNextPage() {
    window.location = "StartClearancePage.aspx";
}
//TODO: Paging and managing row limit- performance management
function readItemFromList() {
    var oList = context.get_web().get_lists().getByTitle('CorrespondenceTrackerList');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
        '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
        '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' +
        '<RowLimit>10</RowLimit></View>'
    );

    this.collListItem = oList.getItems(camlQuery);

    context.load(collListItem);
    context.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );

}

function onQuerySucceeded(sender, args) {
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();
      
    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        var item = new CorrespondenceListItem(oListItem.get_id(), oListItem.get_item('CaseNumber'), oListItem.get_item('Title'), oListItem.get_item('CorrespondenceType'), oListItem.get_item('CorrespondenceTrackerStatus'), oListItem.get_item('DateResponseDue'), "");
        
    }
 
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}


//get the folder associated with the ctlist item
function readItemFromCTDocLib(ctListItemId) {
    var listItemId = ctListItemId;
   
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
        '<View><Query><Where><Eq><FieldRef Name=\'CtListItemId\'/>' +
        '<Value Type=\'Number\'>'+listItemId+'</Value></Eq></Where></Query></View>'
    );

    this.folderItems = oListCTDocLib.getItems(camlQuery);

    context.load(this.folderItems);
    context.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceededDocLibGetFile),
        Function.createDelegate(this, this.onQueryFailedDocLibGetFolder)
    );

}
//get the folder name and get all items within the folder
function onQuerySucceededDocLibGetFile(sender, args) {
    var folderName;
    var listItemEnumerator = folderItems.getEnumerator();
    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
       
        if (oListItem.get_item('FSObjType') === '1') {
            folderName = oListItem.get_item('FileLeafRef'); 
        }
        else
        {
            continue;
        }
        
    }

    var camlQuery = new SP.CamlQuery.createAllItemsQuery();
    camlQuery.set_folderServerRelativeUrl('CorrespondenceTrackerDocuments/' + folderName);//get all items for now, later filere on fileType
  //  camlQuery.set_viewXml("<View Scope='Recursive'><Query><Where><Eq><FieldRef Name='FSObjType' /><Value Type='Lookup'>0</Value></Eq></Where></Query></View>");
   allItems = oListCTDocLib.getItems(camlQuery);
    context.load(allItems,'Include(ContentType,File)');
   
    context.executeQueryAsync(
        function(sender, args){onQuerySucceededReadFile(this)},
        function(sender,args){onQueryFailedGetFile}
        );
}

function onQueryFailedDocLibGetFolder(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}


// the above query will return both files and folder we should look for files based on content type
function onQuerySucceededReadFile(sender, args) {
    var fileUrls ="";
    var ListEnumerator = this.allItems.getEnumerator();
    while(ListEnumerator.moveNext())
    {
        var currentItem = ListEnumerator.get_current();
        var _contentType = currentItem.get_contentType();

        //this should not be necessary anymore as we are getting only files
        if(_contentType.get_name() == "CorrespondenceTrackerDocLibDocumentContentType" || _contentType.get_name() == "Document")
        {
            var File = currentItem.get_file();
            if(File != null)
            {
                fileUrls += File.get_serverRelativeUrl() + '\n';//todo: create document type object here.
            }
       }
    }
    alert(fileUrls);
}

function onQueryFailedGetFile(sender, args) {
    alert('Request failed, could not read file. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}
