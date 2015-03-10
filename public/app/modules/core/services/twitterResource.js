'use strict';

angular.module('core')
    .factory('TwitterResource', ['$http', '$q',
        function TwitterResource ($http, $q) {

            function searchTweeterUsers (searchParams) {

                var deferred = $q.defer();

                var req = {
                    method: 'POST',
                    url: 'api/twitter/users/search',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    //Transform request so parameters are inside req.body on the backend
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    data: {searchString:searchParams}
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

            function getTwitterUserStatuses (twitterUserID) {

                var deferred = $q.defer();

                var req = {
                    method: 'GET',
                    url: '/api/twitter/users/statuses/' + twitterUserID
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

            function retweetStatus (tweetID) {

                var deferred = $q.defer();

                var req = {
                    method: 'GET',
                    url: '/api/twitter/tweets/retweet/' + tweetID
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
                searchTweeterUsers : searchTweeterUsers,
                getTwitterUserStatuses: getTwitterUserStatuses,
                retweetStatus: retweetStatus
            };
        }
    ]);