'use strict';

angular.module('core')
    .factory('SavedStatusesResource', ['$q', '$http',
        function SavedStatusesResource ($q, $http) {

            function getAllStatusesForUser () {
                var deferred = $q.defer();
                var req = {
                    method: 'GET',
                    url: 'api/statuses'
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

            function saveStatus (status) {
                var deferred = $q.defer();
                debugger
                var req = {
                    method: 'POST',
                    url: 'api/statuses/status',
                    data: {statusData:status}
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
                getAllStatusesForUser : getAllStatusesForUser,
                saveStatus: saveStatus
            };
        }
    ]);