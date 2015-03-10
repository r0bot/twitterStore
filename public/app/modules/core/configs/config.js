'use strict';

angular.module('core')
    .run(['$rootScope', '$state','AuthService',
        function($rootScope, $state, AuthService) {

            //Use this to intercept route changes and if the route has data.authenticatedRoute, check for user.
            $rootScope.$on('$stateChangeStart', function (event, next) {
                if(next.data && next.data.authenticatedRoute){
                    AuthService.isAuthenticated().then(function (user) {
                        if(!user) {
                            event.preventDefault();
                            $state.go('login');
                        }
                    });

                }

            });
        }
    ]);