'use strict';

angular.module('dashboard')
    .controller('DashboardController', ['DashboardResource','DashboardService',
        function(DashboardResource,DashboardService){
            var self = this;

            //Load the data from the resource and attach it to the service, so it can be used elsewhere.
            //This function is intended to be used as a refresh also.
            self.loadData = function () {
                DashboardResource.getOverviewData().then(function (response) {
                    if(response.success){
                        DashboardService.data = response.data;
                    }else{

                    }

                });
            };

            self.loadData();
        }
    ]);