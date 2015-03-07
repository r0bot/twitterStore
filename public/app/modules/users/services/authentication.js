'use strict';

angular.module('users')
    .factory('Authentication', ['$http', '$q', 'Identity',
        function($http, $q, Identity) {

            function logout () {
                var deferred = $q.defer();

                $http.get('/auth/logout')
                    .success(function() {
                        Identity.setCurrentUser(undefined);

                        deferred.resolve();
                    });

                return deferred.promise;
            }

            return {
                twitterLogin: twitterLogin,
                logout: logout
            };
        }
    ]);