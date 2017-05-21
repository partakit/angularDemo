(function () {
    'use strict';

    var app = angular.module('myApp', [
        'ui.router',
        'treeControl'
        // 'ui.router.stateHelper'
    ]);

    //Configuration for Angular UI routing.
    app.config([
        '$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider.state({
                name: 'home',
                url: '/',
                templateUrl: 'app/views/home/home.html',
                controller: 'home'
            })

            $locationProvider.html5Mode(true);

        }
    ]);

    app.config(['$httpProvider', function ($httpProvider) {
        //$httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.withCredentials = true;
        //delete $httpProvider.defaults.headers.common["X-Requested-With"];
        //$httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
    }]);

    app.constant('Constants', {
        ApiBaseUrl: "http://localhost:3000/api/",//"http://localhost:3000/",//
    });
})();