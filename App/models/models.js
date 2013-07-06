define(function () {

    //place id in hidden control for each row
    var correspondenceListItem = function (itemId, caseNumber, caseName, documentType, status, dateResponseDue, file) {
        var self = this;
        self.itemId = ko.observable(itemId);
        self.caseNumber = ko.observable(caseNumber);
        self.caseName = ko.observable(caseName);
        self.documentType = ko.observable(documentType);
        self.status = ko.observable(status);
        self.dateResponseDue = ko.observable(dateResponseDue);
        self.file = ko.observable(file);
        self.responseDate = ko.computed({
            read: function () {
                if (self.dateResponseDue()) {
                    var now = new Date(self.dateResponseDue());

                    var month = now.getMonth() + 1;
                    var day = now.getUTCDate();
                    if (day <= 9) {
                        day = "0" + day;
                    }
                    if (month <= 9) {
                        month = "0" + month;
                    }
                    return day + "/" + month + "/" + now.getUTCFullYear();
                } else {
                    return self.dateResponseDue();
                }
            },
            write: function (value) {
                self.dateResponseDue(value);
            }
        });
    };
    //return CorrespondenceListItem;

    var sampleItem = function () {
        this.itemId = ko.observable();
        this.caseNumber = ko.observable();
        this.caseName = ko.observable();
        this.documentType = ko.observable();
        this.status = ko.observable();
        this.dateResponseDue = ko.observable();
        this.file = ko.observable();
    };

    //To store participants
    var participant =
        //join for correspondence tracker list itemID
        function (ctListItemId, name, role, type, isActive) {
            var self = this;
            self.ctListItemId = ko.observable(ctListItemId);
            self.role = ko.observable(role); //it would be one of reviewer, clearer, responsible office, designated owner
            self.name = ko.observable(name);
            self.type = ko.observable(type);
            self.isActive = ko.observable(isActive);
        };

    var correspondenceTrackerDocument =
          function (ctListItemId, file, fileType) {
              var self = this;
              self.CtListItemId = ko.observable(ctListItemId);
              self.File = ko.observable(file);
              self.FileType = ko.observable(fileType);
              self.IsHighilighted = ko.observable();
          };


    //Nav Bar Steps
    var step = function (liclass, stepId, stepClass, stepValue, viewName, viewText, addTemplate) {
        var self = this;
        self.liclass = ko.observable(liclass);
        self.stepId = ko.observable(stepId);
        self.stepClass = ko.observable(stepClass);
        self.stepValue = ko.observable(stepValue);
        self.ViewnName = ko.observable(viewName);
        self.viewText = ko.observable(viewText);
        self.addTemplate = ko.observable(addTemplate);
        self.isActive = ko.observable();
        self.isDone = ko.observable();
        self.isDisadled = ko.observable();

        self.isDisadled.subscribe(function (value) {
            if (value) {
                if (self.viewText() !== 'Home' && self.viewText() !== 'Initiation') {
                    if (self.viewText() === 'Closeout')
                        self.liclass('step closeout');
                    else {
                        self.liclass('step');
                        self.stepClass('step-number');
                        self.addTemplate(true);
                    }
                }

            }
        });

        self.isDone.subscribe(function (value) {
            if (value) {
                self.isDisadled(false);
                self.stepValue('');
                self.stepClass('step-number done');
                if (self.viewText() === 'Home') {
                    self.liclass('');
                    self.liclass('step completed home');
                } else {
                    self.liclass('step completed');
                }
            }
        });
        self.isActive.subscribe(function (value) {
            if (value) {
                if (self.ViewnName() === 'Closeout') {
                    self.liclass('step closeout active');
                } else {
                    self.liclass('step active');
                }
                self.stepClass('step-number current');

            } else {
                if (self.ViewnName() === 'Closeout') {
                    self.liclass('step closeout');
                } else {
                    self.liclass('');
                    self.liclass('step');
                }
                self.stepClass('step-number');
            }
            self.addTemplate(true);
        });
    };

    //Grid Page
    var page = function (pageno, isactive) {
        var self = this;
        self.PageNo = ko.observable(pageno);
        self.IsActive = ko.observable(isactive);
    };


    //Blob File Object
    //Sample File Metadata
    //lastModifiedDate: Thu Jun 27 2013 19:59:49 GMT+0530 (India Standard Time)
    //name: "MicrosoftAjax.js"
    //size: 101550
    //type: "application/javascript"
    var spFile = function (fileName, lastModifiedDate, fileType, fileSize, fileContents) {
        var self = this;
        self.FileName = ko.observable(fileName);
        self.LastModifiedDate = ko.observable(lastModifiedDate);
        self.FileType = ko.observable(fileType);
        self.FileSize = ko.observable(fileSize);
        self.FileContents = ko.observable(fileContents);
    };


    var models = {
        CorrespondenceListItem: correspondenceListItem,
        Participant: participant,
        CorrespondenceTrackerDocument: correspondenceTrackerDocument,
        sampleItem: sampleItem,
        Step: step,
        SpFile: spFile,
        Page: page
    };
    return models;
});
