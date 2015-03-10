'use strict';

angular.module('dashboard')
    .controller('DashboardUsersController', ['$scope','DashboardService',
        function($scope, DashboardService){
            var self = this;
            self.userData = {};
            //Watch the value from the service fo changes so you get latest data if it updated somewhere else.
            $scope.$watch(function(){ return DashboardService.data.users },
                function(newVal) {
                    self.userData = newVal;
                }
            );
        }
    ]);