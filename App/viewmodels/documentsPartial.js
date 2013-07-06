define(function (require) {
    
    var dataservice = require('dataservice'),
        models = require('models');

    var initialized = false;
    var documents = ko.observableArray();
    var spFile = ko.observable();
    var spFileObjectUrl = ko.observable();
    var spFileBinary = ko.observable();

    var activate = function () {
        if (initialized) {
            return;
        }
        initialized = true;
        loadCaseDocuments();
    };

    function loadCaseDocuments() {
        var docs = dataservice.GetCaseDocuments('ABC-123');
        documents([]);
        documents(docs);
    };
    
    var deleteDocument = function (doc) {
        console.log(doc);
        //if (doc.CtListItemId())
        documents.remove(doc);
        alert('removed successfully');
    };

    var addDocument = function () {
        
        if (spFile()) {
            var file = new models.SpFile(spFile().name, spFile().lastModifiedDate, spFile().type, spFile().size, spFileBinary());
            var doc = new models.CorrespondenceTrackerDocument(null, file, file.FileType());
            var result = dataservice.AddSuportingCaseDocument(doc);
            if (result) {
                documents.push(doc);
                //resetting fileupload observables
                spFile('');
                spFileBinary('');
                spFileObjectUrl('');
            }
        } else {
            alert('PLease Select File');
        }

    };
    var vm = {
        activate: activate,
        Documents: documents,
        DeleteDocument: deleteDocument,
        spFile: spFile,
        spFileObjectURL: spFileObjectUrl,
        spFileBinary: spFileBinary,
        AddDocument: addDocument
    };
    return vm;


});