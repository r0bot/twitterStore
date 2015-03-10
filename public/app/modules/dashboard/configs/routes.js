'use strict';

angular.module('dashboard')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $stateProvider.
                //Main dashboard route
                state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/modules/dashboard/views/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboardCtrl',
                })
                .state('dashboard.users', {
                url: '/users',
                templateUrl: 'app/modules/dashboard/views/users.html',
                controller: 'DashboardUsersController',
                controllerAs: 'dashboardUsersCtrl'
                //resolve: RoutePermissionsProvider.isAdmin
                })
                .state('dashboard.overview', {
                    url: '/overview',
                    templateUrl: 'app/modules/dashboard/views/overview.html',
                    controller: 'DashboardOverviewController',
                    controllerAs: 'dashboardOverviewCtrl'
                    //resolve: RoutePermissionsProvider.isAdmin
                })
        }
    ]);