'use strict';

angular.module('core')
    .controller('FavoriteUsersController', ['$scope', '$state', 'FavoriteUsersResource', 'TwitterResource',
        function FavoriteUsersController ($scope, $state, FavoriteUsersResource, TwitterResource) {
            var self = this;
            self.showMessage = true;

            self.loadFavorites = function () {
                self.infoMessage = "Loading...";
                FavoriteUsersResource.getAllFavorites().then(function (response) {
                    if(response.success){
                        self.favoriteUsers = response.data;
                        self.showMessage = false;
                    }else{
                        self.showMessage = true;
                        self.infoMessage = response.message;
                    }

                });
            };
            self.loadFavorites();

            //self.favoriteStatuses = TwitterUsersResource.getTwitterUserStatuses();
            self.listUserStatuses = function (userID) {
                $state.go('fav-user-statuses',{id: userID});
            }

            self.removeFromFavorites = function (userID) {
                self.infoMessage = "Processing...";
                self.showMessage = true;
                FavoriteUsersResource.removeFromFavorites(userID).then(function (response) {
                    if(response.success){
                        self.loadFavorites();
                    }else{
                        self.showMessage = true;
                        self.infoMessage = response.message;
                    }

                });
            }

        }
    ]);