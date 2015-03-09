'use strict';

angular.module('header')
    .controller('HeaderController', ['$state','$rootScope',
        function HeaderController ($state, $rootScope) {
            var self = this;
            self.brand = "twitterStore";
            self.activeState = $state.current.name;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                self.activeState = toState.name;
            })

        }
    ]);