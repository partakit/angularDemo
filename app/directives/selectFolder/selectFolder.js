(function () {
    'use strict';
    angular.module('myApp').directive("selectTargetFolder", [function () {
        return {
            restrict: 'E',
            scope: {
                display: '=',
                onSelect: '&'
            },
            controller: ['$scope', '$timeout', 'ApiService',
                function ($scope, $timeout, ApiService) {
                    $scope.getFolders = function () {
                        $scope.insidee = [];
                        $scope.showAddImage = false;
                        ApiService.Call("GET", "folder", null, function (response) {
                            $scope.treedataa = response;
                        })
                    }

                    $scope.getSubItems = function (item) {
                        $scope.showAddFolder = false;
                        $scope.showAddImage = false;
                        if (item.type == "folder") {
                            $scope.insidee.push(item._id);
                            ApiService.Call("GET", "folder/" + item._id, null, function (response) {
                                $scope.treedataa = response;
                            })
                        }

                    }

                    $scope.getBack = function () {
                        $scope.showAddFolder = false;
                        $scope.showAddImage = false;
                        if ($scope.insidee.length > 0) {
                            $scope.insidee.splice($scope.insidee.length - 1, 1);
                            if ($scope.insidee.length > 0) {
                                var id = $scope.insidee[$scope.insidee.length - 1];

                                ApiService.Call("GET", "folder/" + id, null, function (response) {
                                    $scope.treedataa = response;
                                })
                            } else {
                                $scope.getFolders();
                            }

                        }
                    };

                    $scope.init = function () {
                        $scope.treedataa = [];
                        $scope.insidee = [];
                        if ($scope.display == undefined || $scope.display == null) $scope.display = false;
                        $scope.getFolders();
                    }

                    $scope.init();
                }],
            templateUrl: "/app/directives/selectFolder/selectFolder.html",
        };
    }]);

})();