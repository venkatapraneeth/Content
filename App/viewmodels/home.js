define(function (require) {
    'use strict';

    var router = require('durandal/plugins/router'),
        dataservice = require('dataservice'),
        shell = require('viewmodels/shell'),
        models = require('models');


    var cases = ko.observableArray();
    var caseStatusList = ko.observableArray();
    var casesCache = ko.observableArray();
    var gridPages = ko.observableArray();

    var activePage = null;
    var pageSize = 8;


    var initialized = false;

    var vm = {
        activate: activate,
        viewAttached:viewAttached,
        title: 'Home',
        FilterText: ko.observable(),
        loadInitiation: loadInitiation,
        Cases: cases,
        GridPages: gridPages,
        LoadStatusPage: loadStatus,
        SelectedCaseStatus: ko.observable(),
        FilterByKeyword: ko.observable(),
        CaseStatusList: caseStatusList,
        ApplyFilter: applyFilter,
        Search: search,
        OnPageChangeclicked: changePage,
        NextPage: nextPage,
        PreviousPage: previousPage
    };
    return vm;



    function activate() {
        if (initialized) { return; }
        initialized = true;
        getCases();
        loadCaseStatusList();
        
        shell.ViewnName('Home');
    }

    function viewAttached() {
        
    }


    function getCases() {
        debugger;
        dataservice.GetCaseItemsAsync().then(function (casesFromServer) {
            casesCache(casesFromServer);
            cases(casesFromServer);
            bindGrid();
        }, function() {
        });
    }

    function bindGrid() {
        var items = Enumerable.From(casesCache()).Take(pageSize).ToArray();
        var pageCount = casesCache().length / pageSize;
        generateGridPager(pageCount);
        cases(items);
        if (gridPages()[0]) {
            gridPages()[0].IsActive(true);
            activePage = gridPages()[0];
        }
    }

    function generateGridPager(count) {
        gridPages([]);
        for (var i = 0; i < count; i++) {
            gridPages.push(new models.Page(i + 1, false));
        }
    }

    function loadStatus(obj) {
        alert("Navigating to: " + obj.status());
        //var navTo = null;
        //if(obj.status()==='Clearance')
    }


    function loadCaseStatusList() {
        var items = dataservice.getCaseStatusList();
        caseStatusList(items);
    }

    function applyFilter() {
        alert('filtering on  ' + this.FilterByKeyword() + '::' + this.SelectedCaseStatus());
    }

    function search() {

    }

    function changePage(page) {
        var currentpagenode = Enumerable.From(gridPages()).First(function (x) { return x.IsActive() === true; });
        currentpagenode.IsActive(false);
        page.IsActive(true);
        activePage = page;
        var nextpageItems = Enumerable.From(casesCache()).Skip(page.PageNo() * pageSize - pageSize).Take(pageSize).ToArray();
        cases([]);
        cases(nextpageItems);
        console.log(page);
    }


    function nextPage() {
        var nextPageobj = gridPages()[activePage.PageNo()];
        if (nextPageobj) {
            changePage(nextPageobj);
        }
    }

    function previousPage() {
        var previousPageobj = gridPages()[activePage.PageNo() - 2];
        if (previousPageobj) {
            changePage(previousPageobj);
        }
    }


    function loadInitiation() {
        var navTo = '#/initiation';
        console.log(navTo);
        return router.navigateTo(navTo);
    }

});