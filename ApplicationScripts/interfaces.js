var CorrespondenceListItem = (function () {
    //place id in hidden control for each row
    function CorrespondenceListItem(itemId, caseNumber, caseName, documentType, status, dateResponseDue, file) {
        this.itemId = itemId;
        this.caseNumber = caseNumber;
        this.caseName = caseName;
        this.documentType = documentType;
        this.status = status;
        this.dateResponseDue = dateResponseDue;
        this.file = file;
    }
    return CorrespondenceListItem;
})();
