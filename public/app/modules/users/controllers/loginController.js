'use strict';

angular.module('users')
    .controller('LoginController', ['$scope', '$state', 'Authentication', 'Identity',
        function LoginController ($scope, $state, Authentication, Identity) {
            var self = this;

            self.identity = Identity;

            self.twitterLogin = function () {
                Authentication.twitterLogin()
            };
        }
    ]);