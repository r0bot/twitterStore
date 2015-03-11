'use strict';

var config = require('./config'),
    path = require('path'),
    passport = require('passport'),
    User = require('./../server/models/User/User');

module.exports = function () {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (error, user) {
			done(error, user);
		});
	});

    //Initialize the defined login strategies
    config.getGlobbedFiles('./config/loginStrategies/**/*.js').forEach(function(strategy) {
        require(path.resolve(strategy))();
    });
};