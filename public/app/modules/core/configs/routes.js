'use strict';

angular.module('core')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/modules/core/views/recent-tweets.html',
                    controller: 'RecentTweetsController',
                    controllerAs: 'recentTweetsCtrl'
                })
                //.state('highlights', {
                //    url: '/highlights',
                //    templateUrl: 'app/modules/catalog/views/catalog.html',
                //    controller: 'CatalogController',
                //    controllerAs: 'catalogCtrl'
                //})

        }
    ]);