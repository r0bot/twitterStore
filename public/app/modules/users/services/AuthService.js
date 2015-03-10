'use strict';

angular.module('core')
    .factory('AuthService', function ($state, $http) {
        var authService = {};

        authService.user = {};

        //get user from server
        authService.getUser = function () {
            return $http
                .get('/auth')
                .then(function (response) {
                    if(response.data.success){
                        authService.user = response.data.user;
                        return response.data.user;
                    }
                    return false;
                });
        };

        //Logout the user
        authService.signOut = function () {
            return $http
                .get('/auth/logout')
                .then(function (response) {
                    if(response.data.success){
                        //On successful sign out remove the user and redirect to home page
                        authService.user = {};
                        $state.go('home');
                        return response.data.user;
                    }
                    return false;
                });
        };


        //Add functionality when user is saved in cookie in this function
        authService.isAuthenticated = function () {
            return authService.getUser()
        };

        //check user for admin rights.
        //TODO when cookie user is available check from there not from server.
        authService.isAdmin = function () {
            authService.getUser().then(function (user) {
                if(user){
                    return (user.roles.indexOf('admin'))?true:false;
                }else{
                    return false
                }
            });

        };

        return authService;
    })
