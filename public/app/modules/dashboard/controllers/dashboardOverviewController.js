'use strict';

angular.module('dashboard')
    .controller('DashboardOverviewController', ['$scope','DashboardService',
        function($scope, DashboardService){
            var self = this;
            self.overviewData = {};
            //Watch the value from the service fo changes so you get latest data if it updated somewhere else.
            $scope.$watch(function(){ return DashboardService.data.overview },
                function(newVal) {
                    self.overviewData = newVal;
                }
            );
        }
    ]);