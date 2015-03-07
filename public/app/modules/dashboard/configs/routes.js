'use strict';

angular.module('dashboard')
    .config(['$stateProvider', '$urlRouterProvider', 'RoutePermissionsProvider',
        function ($stateProvider, $urlRouterProvider, RoutePermissionsProvider) {

            $stateProvider.
                //Main dashboard route
                state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/modules/dashboard/views/dashboard.html',
                    controller: 'DashboardMainController',
                    controllerAs: 'dashboardCtrl',
                    resolve: RoutePermissionsProvider.isAdmin
                })
        }
    ]);