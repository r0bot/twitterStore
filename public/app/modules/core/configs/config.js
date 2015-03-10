'use strict';

angular.module('core')
    .run(['$rootScope', '$state','AuthService',
        function($rootScope, $state, AuthService) {

            //Use this to intercept route changes and if the route has data.authenticatedRoute, check for user.
            $rootScope.$on('$stateChangeStart', function (event, next) {
                if(next.data){
                    //If route requires authentication
                    if(next.data.authenticatedRoute){
                        AuthService.isAuthenticated().then(function (user) {
                            if(!user) {
                                event.preventDefault();
                                $state.go('login');
                            }
                        });
                    //If route requires admin rights
                    }else if(next.data.adminRoute){
                        AuthService.isAuthenticated().then(function (isAdmin) {
                            if(!isAdmin) {
                                event.preventDefault();
                                $state.go('login');
                            }
                        });
                    }
                }


            });
        }
    ]);