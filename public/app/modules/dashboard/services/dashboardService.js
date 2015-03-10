'use strict';

angular.module('dashboard')
    .service('DashboardService', [
        function DashboardService () {
            //Use this service to store the data that main dashboard controller loads and provide it to sub controllers as needed. Without loading it again.
            var overviewDataStore = this;
            overviewDataStore.data = {};
        }
    ]);