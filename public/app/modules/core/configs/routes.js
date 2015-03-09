'use strict';

angular.module('core')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/modules/core/views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl'
                })
                .state('favorites', {
                    url: '/favorite-users',
                    templateUrl: 'app/modules/core/views/favorites-list.html',
                    controller: 'FavoriteUsersController',
                    controllerAs: 'favoriteUsersCtrl'
                })
                .state('find-users', {
                    url: '/find-users',
                    templateUrl: 'app/modules/core/views/find-users.html',
                    controller: 'FindUsersController',
                    controllerAs: 'findUsersCtrl'
                })
                .state('fav-user-statuses', {
                    url: '/fav-user-statuses/{id}',
                    templateUrl: 'app/modules/core/views/fav-user-statuses.html',
                    controller: 'FavUserStatusesController',
                    controllerAs: 'favUserStatusesCtrl'
                })
                .state('saved-statuses', {
                    url: '/saved-statuses',
                    templateUrl: 'app/modules/core/views/saved-statuses.html',
                    controller: 'SavedStatusesController',
                    controllerAs: 'savedStatusesCtrl'
                })

        }
    ]);