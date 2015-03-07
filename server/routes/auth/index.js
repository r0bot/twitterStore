'use strict';

var passport = require('passport');
var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    var AuthenticationController = require('./../../controllers/Authentication/AuthenticationController')(passport);

    // Setting the twitter oauth routes
    router.get('/twitter', passport.authenticate('twitter'));
    router.get('/twitter/callback', AuthenticationController.oauthCallback('twitter'));

	return router;
};