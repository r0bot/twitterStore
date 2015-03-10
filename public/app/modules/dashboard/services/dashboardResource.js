'use strict';

angular.module('dashboard')
    .factory('DashboardResource', ['$q', '$http',
        function DashboardResource ($q, $http) {

            function getOverviewData () {
                var deferred = $q.defer();
                var req = {
                    method: 'GET',
                    url: 'api/dashboard'
                };

                $http(req)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function(data, status, headers, config) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            }

            return {
                getOverviewData : getOverviewData
            };
        }
    ]);