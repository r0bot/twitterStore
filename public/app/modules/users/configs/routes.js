'use strict';

angular.module('users')
    .config(['$stateProvider', '$urlRouterProvider', 'RoutePermissionsProvider',
        function ($stateProvider, $urlRouterProvider, RoutePermissionsProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.
                state('profile', {
                    url: '/profile',
                    templateUrl: 'app/modules/users/views/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'profileCtrl',
                    resolve: RoutePermissionsProvider.isAuthenticated
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/modules/users/views/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl'
                })
        }
    ]);