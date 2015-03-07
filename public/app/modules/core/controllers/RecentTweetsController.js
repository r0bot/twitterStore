'use strict';

angular.module('core')
    .controller('RecentTweetsController', ['$scope', '$state', 'Authentication', 'Identity',
        function RecentTweetsController ($scope, $state, Authentication, Identity) {
            var self = this;

            self.identity = Identity;

            self.twitterLogin = function () {
                Authentication.twitterLogin()
            };
        }
    ]);