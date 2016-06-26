(function(){
    'use strict';
    angular.module('peopleSearch.app')
        .config(['$compileProvider', appConfig]);


    function appConfig($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }
})();
