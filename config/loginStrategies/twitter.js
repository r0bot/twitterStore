'use strict';

var passport = require('passport');
var config = require('./../config');
var User = require('./../../server/models/User/User');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function() {
    // Use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.consumerKey,
            consumerSecret: config.twitter.consumerSecret,
            callbackURL: config.twitter.callbackURL,
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {

            process.nextTick(function() {
                var providerData = profile._json;
                providerData.token = token;
                providerData.tokenSecret = tokenSecret;

                User.findOne({ 'twitterID' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        var newUser  = new User();

                        // set all of the user data that we need
                        newUser.twitterID          = profile.id;
                        newUser.providerData      = providerData;
                        newUser.username = profile.username;
                        newUser.displayName = profile.displayName;

                        // save our user into the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
};