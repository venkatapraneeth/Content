define(function (require) {
    'use strict';

    var datasevice = require('dataservice'),
        models = require('models');

    var initialized = false;
    var participants = ko.observableArray();
    var participantName = ko.observable();
    var participantRole = ko.observable();
    var users = ko.observableArray();
    var activate = function () {
        if (initialized) {
            return;
        }
        initialized = true;
        loadCaseParticipants();
    };

    function loadCaseParticipants() {
        var items = datasevice.GetCaseParticipants('ABC-123');
        participants([]);
        participants(items);
        datasevice.SearchUser(users);
        
    }


    var addParticipant = function () {
        if (participantName()) {
            var participant = new models.Participant(null, participantName(), participantRole());
            var status = datasevice.AddCaseParticipant(participant);

            if (status) {
                participants.push(participant);
                participantName('');
                participantRole('');
            }
        } else {
            alert('PLease Enter Participant Name');
        }
    };

    var removeParticipant = function (participant) {
        participants.remove(participant);
        alert(participant.name() + ' Removed');
    };

    var searchUser = function () {
        var users = datasevice.SearchUser();
        console.log(users);
        return users;
    };

    var searchUserSuccess = function (data) {
       
    };

    var onUserSelect = function(event, ui) {
    };

    var vname = ko.observable('Participants');
    var vm = {
        VName: vname,
        activate: activate,
        Participants: participants,
        ParticipantName: participantName,
        ParticipantRole: participantRole,
        AddParticipant: addParticipant,
        RemoveParticipant: removeParticipant,
        SearchUser: searchUser,
        OnSearchSuccess: searchUserSuccess,
        OnUserSelect: onUserSelect,
        Users: users
    };
    return vm;

});