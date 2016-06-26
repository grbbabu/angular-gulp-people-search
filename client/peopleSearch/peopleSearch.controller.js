(function () {
    'use strict';
    angular.module('peopleSearch.app')
        .controller('peopleSearchController', ['peopleDataFactory', peopleSearchController]);

    function peopleSearchController(peopleDataFactory) {
        /* jshint validthis: true */
        var vm = this;
        vm.model = {};
        vm.initialize = initialize;
        vm.loadPeopleData = loadPeopleData;
        vm.getPeopleData = getPeopleData;
        vm.searchFilterOptions = {
            updateOn: 'default blur',
            debounce: { default: 200, blur: 0 }
        };
        vm.hasError = hasError;

        vm.initialize();
        vm.loadPeopleData();

        function initialize() {
            vm.model = {
                people: [],
                searchTerm: '',
                error: false
            };
        }

        function loadPeopleData() {
            peopleDataFactory.getPeopleData().then(function (response) {
                vm.model.error = false;
                vm.model.people = response.data;
            }, function () {
                vm.model.error = true;
                vm.model.people = [];
            });
        }

        function getPeopleData() {
            return vm.model.people;
        }

        function hasError() {
            if (vm.model && vm.model.error) {
                return vm.model.error;
            }
            return false;
        }
    }
}());