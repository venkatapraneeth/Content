define(function (require) {
    debugger;
    var router = require('durandal/plugins/router'),
        models = require('models'),
        utils = require('services/utils'),
        dataservice = require('dataservice'),
        shell = require('viewmodels/shell');

    var initialized = false;
    var spFile = ko.observable();
    var spFileObjectUrl = ko.observable();
    var spFileBinary = ko.observable();
    var caseItem = new models.CorrespondenceListItem();
    var correspondenceTypeList = ko.observableArray();
    var selectedCorrespondenceItem = ko.observable();
    var fileName = ko.observable();
    var saveResponse = ko.observable();


    spFile.subscribe(function (value) {

        if (value)
            fileName(value.name);
    });

    saveResponse.subscribe(function (value) {
        console.log(value);
        if (value) {
            if (value === "Success") {
                var navTo = '#/assignowner';
                console.log(navTo);
                router.navigateTo(navTo);
            }
            resetUi();
        }
    });

    ko.validation.init();
    var vm = {
        activate: activate,
        Case: caseItem,
        CorrespondensceList: correspondenceTypeList,
        SelectedCorrespondenceItem: selectedCorrespondenceItem,
        OnSubmit: onSubmit,
        OnCancel: onCancel,
        spFile: spFile,
        spFileObjectURL: spFileObjectUrl,
        spFileBinary: spFileBinary,
        fileName: fileName
    };

    vm["errors"] = ko.validation.group(vm, { deep: true });
    return vm;

    function activate() {

        if (initialized) { return; }
        initialized = true;

        loadCorrespondenceList();
        markRequired();
        shell.ViewnName('Initiation');

    }

    function markRequired() {
        caseItem.caseName.extend({ required: true });
        caseItem.responseDate.extend({ required: true });
        selectedCorrespondenceItem.extend({ required: true });
    }


    function loadCorrespondenceList() {
        var items = dataservice.getCorrespondenceTypeList();
        correspondenceTypeList(items);
    }

    function onSubmit() {
        if (this.isValid()) {
            console.log(spFileBinary());
            caseItem.file(spFileBinary());
            debugger;
            var response = dataservice.SaveCorrespondenceItem(caseItem);
            saveResponse(response.Status);

        } else {
            this.errors.showAllMessages();
        }
    }

    function onCancel() {
        var navTo = '#/home';
        console.log(navTo);
        return router.navigateTo(navTo);
    }

    function resetUi() {
        saveResponse(null);
        caseItem = null;
        caseItem = new models.CorrespondenceListItem();
        selectedCorrespondenceItem('');
        fileName('');
        loadCorrespondenceList();
        markRequired();
    }

});