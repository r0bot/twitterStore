'use strict';

var dataRepositories = require('./../../dataRepositories'),
    q = require('q');

var AuthenticationController = function (passport) {

    function logout (req, res) {
        req.logout();
        res.json({
            success: true,
            user: ''
        });
    }

    //Return user to front end
    function isLoggedIn (req, res, next) {
        if (req.user) {
            res.json({
                success: true,
                user: req.user
            });
        } else {
            res.json({
                success: false,
                user: ''
            });
        }

    }

    //Middleware function for routes, to check if user is logged in
    function isAuthenticated (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.sendStatus(403);
        }
    }

    //Middleware function for routes, to check if user is admin
    function isAdmin (req, res, next) {
        if (req.user.roles.indexOf('admin')) {
            return next();
        } else {
            res.sendStatus(403);
        }
    }


    // OAuth callback
    function oauthCallback (strategy) {
        return function(req, res, next) {
            passport.authenticate(strategy, function(err, user) {
                if (err || !user) {
                    res.status(403).send(err);
                    return;
                }
                req.logIn(user, function (error) {
                    if (error) {
                        res.status(403).send(error);
                        return;
                    }
                    res.redirect('/');
                });
            })(req, res, next);
        };
    }

    function saveOAuthUserProfile (req, providerData) {
        var deferred = q.defer();

        dataRepositories.users.createUser(providerData).then(function (createdUser) {
            deferred.resolve(createdUser);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    return {
        isLoggedIn: isLoggedIn,
        isAuthenticated: isAuthenticated,
        isAdmin: isAdmin,
        logout: logout,
        oauthCallback: oauthCallback,
        saveOAuthUserProfile: saveOAuthUserProfile
    }
};

module.exports = AuthenticationController;