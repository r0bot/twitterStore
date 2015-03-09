'use strict';

angular.module('core')
    .controller('SavedStatusesController', ['$scope', '$state', 'SavedStatusesResource', 'TwitterResource',
        function SavedStatusesController ($scope, $state, SavedStatusesResource, TwitterResource) {
            var self = this;
            self.showMessage = true;
            self.showRequestStatus = false;

            self.loadStatuses = function () {
                self.infoMessage = "Loading...";
                SavedStatusesResource.getAllStatusesForUser().then(function (response) {
                    if(response.success){
                        self.SavedUserStatuses = response.data;
                        self.showMessage = false;
                    }else{
                        self.showMessage = true;
                        self.infoMessage = response.message;
                    }

                }, function (response) {
                    self.showMessage = true;
                    self.infoMessage = "Error loading messages!";
                    console.log(error);
                });
            };
            self.loadStatuses();

            self.retweetStatus = function (statusID){
                self.showRequestStatus = true;
                self.requestStatus = 'Retweeting status..';
                TwitterResource.retweetStatus(statusID).then(function (response) {
                    if(response.success){
                        self.showRequestStatus = true;
                        self.requestStatus = response.message;
                    }else{
                        self.showRequestStatus = true;
                        self.requestStatus = response.message;
                    }
                });
            };

        }
    ]);