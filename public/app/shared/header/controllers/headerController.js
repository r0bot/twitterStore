'use strict';

angular.module('header')
    .controller('HeaderController', ['$scope','$state','AuthService',
        function HeaderController ($scope, $state, AuthService) {
            var self = this;
            self.brand = "twitterStore";

            AuthService.getUser();

            //watch the user in authService for changes, so it can show hide links
            $scope.$watch(function(){ return AuthService.user},
                function(user) {
                    self.isUserLoggedin = (user.displayName)?true:false;
                    self.isUserAdmin = (user.roles && user.roles.indexOf('admin'))?true:false;
                }
            );

            self.signOut = function () {
                AuthService.signOut();
            }
        }
    ]);