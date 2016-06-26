(function(){
    'use strict';
    angular.module('peopleSearch.app.components.services')
        .factory('peopleDataFactory', ['$http', peopleDataFactory]);

    function peopleDataFactory($http){
        return {
            getPeopleData: getPeopleData
        };

        function getPeopleData() {
            return $http.get('./data/data.json');
        }
    }
})();
