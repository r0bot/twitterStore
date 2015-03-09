'use strict';

angular.module('core')
    .controller('FindUsersController', ['$scope', '$state', 'TwitterResource', 'FavoriteUsersResource',
        function FindUsersController ($scope, $state, TwitterResource, FavoriteUsersResource) {
            var self = this;
            self.showRequestStatus = false;

            self.twitterUsers = [];

            self.twitterUsersSearch = '';

            self.textChange = function (value) {
                console.log('asd');
                if(value.length > 2) {
                    TwitterResource.searchTweeterUsers(value).then(function (result) {
                        self.twitterUsers = result;
                    });
                }
            };

            self.addToFavorites = function (userID) {
                self.showRequestStatus = true;
                self.requestStatus = 'Adding to favorites...';
                FavoriteUsersResource.addFavoriteUser(userID).then(function (response) {
                    if(response.success){
                        self.showRequestStatus = true;
                        self.requestStatus = response.message;
                    }else{
                        self.showRequestStatus = true;
                        self.requestStatus = response.message;
                    }
                });
            }
        }
    ]);