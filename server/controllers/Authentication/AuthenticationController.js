'use strict';

var dataRepositories = require('./../../dataRepositories'),
    q = require('q');

var AuthenticationController = function (passport) {

    function logout (req, res) {
        req.logout();
        res.redirect('/');
    }

    // OAuth callback
    function oauthCallback (strategy) {

        return function(req, res, next) {

            passport.authenticate(strategy, function(err, user) {
                if (err || !user) {

                }
                res.redirect('/');
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

    function getPublicUser (user) {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            country: user.country,
            city: user.city,
            postalCode: user.postalCode,
            address: user.address,
            phoneNumber: user.phoneNumber
        };
    }

    return {
        logout: logout,
        oauthCallback: oauthCallback,
        saveOAuthUserProfile: saveOAuthUserProfile
    }
};

module.exports = AuthenticationController;