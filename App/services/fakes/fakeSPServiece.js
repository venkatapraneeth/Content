define(['models'], function (models) {

    var getCaseItems = function () {
        var cases = [];
        //itemId, caseNumber, caseName, documentType, status, dateResponseDue, file
        cases.push(new models.CorrespondenceListItem('1', '2013-SE-001', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('2', '2013-SE-002', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('3', '2013-SE-003', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('4', '2013-SE-004', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('5', '2013-SE-005', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));

        cases.push(new models.CorrespondenceListItem('6', '2013-SE-006', 'Case 2013-SE-006', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('7', '2013-SE-007', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('8', '2013-SE-008', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('9', '2013-SE-009', 'Case 2013-SE-009', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('10', '2013-SE-010', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));

        cases.push(new models.CorrespondenceListItem('11', '2013-SE-011', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('12', '2013-SE-012', 'Case 2013-SE-012', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('13', '2013-SE-013', 'Adipiscing Elit Aenean 2013-SE-013', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('14', '2013-SE-014', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('15', '2013-SE-015', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));

        cases.push(new models.CorrespondenceListItem('16', '2013-SE-016', 'Sample Case', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('17', '2013-SE-017', 'Case 2013-SE-017', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('18', '2013-SE-018', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('19', '2013-SE-019', 'Reasearch', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('20', '2013-SE-020', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));


        cases.push(new models.CorrespondenceListItem('21', '2013-SE-021', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('22', '2013-SE-022', 'Corespondence 2013-SE-022', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('23', '2013-SE-023', 'Tracker 2013-SE-023', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('24', '2013-SE-024', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('25', '2013-SE-025', 'Correspondence Tracker', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));


        cases.push(new models.CorrespondenceListItem('26', '2013-SE-026', 'Important Case', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('27', '2013-SE-027', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('28', '2013-SE-028', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('29', '2013-SE-029', 'Case Urgent', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('30', '2013-SE-030', '2013-SE-030', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));


        cases.push(new models.CorrespondenceListItem('31', '2013-SE-031', 'Case 2013-SE-031', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('32', '2013-SE-032', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('33', '2013-SE-033', '2013-SE-033', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('34', '2013-SE-034', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('35', '2013-SE-035', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));


        cases.push(new models.CorrespondenceListItem('36', '2013-SE-036', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('37', '2013-SE-037', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('38', '2013-SE-038', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('40', '2013-SE-040', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('40', '2013-SE-040', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));


        cases.push(new models.CorrespondenceListItem('41', '2013-SE-041', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('42', '2013-SE-042', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('43', '2013-SE-043', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('44', '2013-SE-044', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('45', '2013-SE-045', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));

        cases.push(new models.CorrespondenceListItem('46', '2013-SE-046', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('37', '2013-SE-047', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('48', '2013-SE-048', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('49', '2013-SE-049', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('50', '2013-SE-050', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));

        cases.push(new models.CorrespondenceListItem('51', '2013-SE-051', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('52', '2013-SE-052', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('54', '2013-SE-053', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('54', '2013-SE-054', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('55', '2013-SE-055', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));

        cases.push(new models.CorrespondenceListItem('56', '2013-SE-056', 'Lorem Ipsum Dolor', 'General Correspondence', 'Clearance', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('57', '2013-SE-057', 'Sit Amet Consectetur', 'Action Memo', 'Assign Owner', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('58', '2013-SE-058', 'Adipiscing Elit Aenean', 'Telephone Log', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('59', '2013-SE-059', 'A Odio Dui', 'Note', 'Drafting', '06/01/2013', 'ABC'));
        cases.push(new models.CorrespondenceListItem('60', '2013-SE-060', 'Ut Ultrices Aliquet Mauris', 'Calendar', 'Assign Owner', '06/01/2013', 'ABC'));

        return cases;
    };


    var saveCorrespondenceItem = function (item) {
        console.log('saving corrrespondence item......');
        console.log(item);
    };

    var getCaseDocuments = function (caseNumber) {
        var docs = [];
        docs.push(new models.CorrespondenceTrackerDocument(1, new models.SpFile('Abc.txt', '12/12/2013', 'text', 1024, 'ABCD'), 'Text'));
        docs.push(new models.CorrespondenceTrackerDocument(2, new models.SpFile('Lorem-Ipsum-Original.docx', '12/12/2013', 'wordDocument', 1024, 'ABCD'), 'worddocument'));
        docs.push(new models.CorrespondenceTrackerDocument(3, new models.SpFile('Jquery.js', '12/12/2013', 'App', 1024, 'ABCD'), 'Application/Javascript'));
        docs.push(new models.CorrespondenceTrackerDocument(4, new models.SpFile('Abc.txt', '12/12/2013', 'text', 1024, 'ABCD'), 'text'));
        return docs;
    };


    var getCaseParticipants = function (caseNumber) {
        var participants = [];
        participants.push(new models.Participant(null, 'Doe, Jane', 'Designated Owner', 'User'));
        participants.push(new models.Participant(null, 'Smit, Gary', 'Clearer', 'User'));
        participants.push(new models.Participant(null, 'Administration', 'Administration', 'Group'));
        participants.push(new models.Participant(null, 'Marketing', 'Marketing', 'Group'));
        participants.push(new models.Participant(null, 'Abc, Xyz', 'Reviewer', 'User'));
        return participants;
    };

    var allParticipants = function () {
        var participants = [];
        participants.push(new models.Participant(null, 'Doe, Jane', 'Designated Owner', 'User'));
        participants.push(new models.Participant(null, 'Smit, Gary', 'Clearer', 'User'));
        participants.push(new models.Participant(null, 'Administration', 'Administration', 'Group'));
        participants.push(new models.Participant(null, 'Marketing', 'Marketing', 'Group'));
        participants.push(new models.Participant(null, 'Steve, Gentile', 'Reviewer', 'User'));
        participants.push(new models.Participant(null, 'Steve, Michelotti', 'Reviewer', 'User'));
        participants.push(new models.Participant(null, 'Storch, Amy', 'Marketing', 'User'));
        participants.push(new models.Participant(null, 'Storch, Json', 'Reviewer', 'User'));
        participants.push(new models.Participant(null, 'Miller, Chris', 'Administration', 'User'));
        participants.push(new models.Participant(null, 'Miller, Will', 'Reviewer', 'User'));
        participants.push(new models.Participant(null, 'Kranthi, Kiran', 'Marketing', 'User'));
        participants.push(new models.Participant(null, 'Kiran, Gunda', 'Reviewer', 'User'));
        participants.push(new models.Participant(null, 'Joyce, James', 'Administration', 'User'));
        participants.push(new models.Participant(null, 'Joyce, Peter', 'Reviewer', 'User'));
        participants.push(new models.Participant(null, 'Research', 'Reviewer', 'User'));
        participants.push(new models.Participant(null, 'Abc, Xyz', 'Administration', 'User'));
        return participants;
    };


    var service = {
        getCaseItems: getCaseItems,
        SaveCorrespondenceItem: saveCorrespondenceItem,
        GetCaseDocuments: getCaseDocuments,
        GetCaseParticipants: getCaseParticipants,
        GetAllParticipants: allParticipants
    };

    return service;

});