(function () {
    'use strict';
    angular.module('myApp')
        .controller('home', ['$scope', 'Constants', 'ApiService',
            function ($scope, Constants, ApiService) {

                $scope.init = function () {
                    console.clear();
                    $scope.treedata = [];
                    $scope.inside = [];
                    $scope.showAddFolder = false;
                    $scope.showAddImage = false;
                    $scope.showSelectTarget = false;
                    $scope.selectedImage = null;
                    $scope.foldername = null;
                    $scope.getFolders();
                    $scope.treeOptions = {
                        nodeChildren: "child",
                        dirSelectable: true
                    }
                }

                $scope.getFolders = function () {
                    $scope.inside = [];
                    $scope.showAddImage = false;
                    $scope.showSelectTarget = false;
                    ApiService.Call("GET", "folder", null, function (response) {
                        $scope.treedata = response;
                    })
                }

                $scope.getSubItems = function (item) {
                    $scope.showAddFolder = false;
                    $scope.showAddImage = false;
                    $scope.showSelectTarget = false;
                    if (item.type == "folder") {
                        $scope.inside.push(item._id);
                        ApiService.Call("GET", "folder/" + item._id, null, function (response) {
                            $scope.treedata = response;
                        })
                    }

                }

                $scope.getBack = function () {
                    $scope.showAddFolder = false;
                    $scope.showAddImage = false;
                    $scope.showSelectTarget = false;
                    if ($scope.inside.length > 0) {
                        $scope.inside.splice($scope.inside.length - 1, 1);
                        if ($scope.inside.length > 0) {
                            var id = $scope.inside[$scope.inside.length - 1];

                            ApiService.Call("GET", "folder/" + id, null, function (response) {
                                $scope.treedata = response;
                            })
                        } else {
                            $scope.getFolders();
                        }

                    }
                };

                $scope.addFolder = function () {
                    $scope.showAddImage = false;
                    $scope.showSelectTarget = false;
                    ApiService.Call("POST", "folder/", { foldername: $scope.foldername }, function (response) {
                        $scope.foldername = null;
                        $scope.showAddFolder = false;
                        $scope.getFolders();
                    })
                }

                $scope.addImage = function () {
                    $scope.showAddFolder = false;
                    $scope.showSelectTarget = false;
                    ApiService.Call("POST", "folder/" + $scope.inside[$scope.inside.length - 1], { imageUrl: $scope.imageUrl }, function (response) {
                        $scope.foldername = null;
                        $scope.showAddFolder = false;
                        $scope.showAddImage = false;
                        $scope.getFolders();
                    })
                }

                $scope.moveImage = function (target) {
                    alert($scope.selectedImage);
                    ApiService.Call("POST", "folder/" + target + "/move",
                        { imageUrl: $scope.selectedImage }, function (response) {
                            $scope.foldername = null;
                            $scope.showAddFolder = false;
                            $scope.showAddImage = false;
                            $scope.getFolders();
                        })
                }

                $scope.showSelect = function (item) {
                    $scope.showAddFolder = false;
                    $scope.showAddImage = false;
                    $scope.showSelectTarget = true;
                    $scope.selectedImage = item._id;
                }

            }]);
})();