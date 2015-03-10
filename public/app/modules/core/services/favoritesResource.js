'use strict';

angular.module('core')
    .factory('FavoriteUsersResource', ['$resource', '$q', '$http',
        function FavoriteUsersResource ($resource, $q, $http) {

            function getAllFavorites () {
                var deferred = $q.defer();
                var req = {
                    method: 'GET',
                    url: 'api/favoriteUsers'
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

            function addFavoriteUser (twitterUserID) {
                var deferred = $q.defer();
                var req = {
                    method: 'POST',
                    url: 'api/favoriteUsers/user',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];

                        for(var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }

                        return str.join("&");
                    },
                    data: {twitterUserID:twitterUserID}
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
            function removeFromFavorites (userID){
                var deferred = $q.defer();
                var req = {
                    method: 'DELETE',
                    url: 'api/favoriteUsers/user',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];

                        for(var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    data: {userID: userID}
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
                getAllFavorites : getAllFavorites,
                addFavoriteUser: addFavoriteUser,
                removeFromFavorites: removeFromFavorites,
                saveStatus: saveStatus
            };
        }
    ]);