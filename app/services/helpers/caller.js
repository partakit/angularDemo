(function () {
    'use strict';
    angular.module('myApp').
        factory('ApiService', ['$http', '$q', '$rootScope', '$window', 'Constants',
            function ($http, $q, $rootScope, $window, Constants) {
                return {
                    Call: function (method, url, dataModel, successFunc) {
                        if (dataModel != undefined || dataModel != null)
                            angular.forEach(dataModel, function (value, key) {
                                url = url.replace("{" + key + "}", value);
                            });
                        var req = {
                            method: method,
                            url: Constants.ApiBaseUrl + url,
                            data: dataModel != undefined || dataModel != null ? JSON.stringify(dataModel) : null
                        }
                        $http(req).then(function (result) {
                            successFunc(result.data);
                        }, function (error) {
                            console.error(data);
                        });

                    }
                }
            }]);


})();
