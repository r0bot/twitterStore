'use strict';

var Twitter = require('twitter'),
    config = require('../../../config/config'),
    q = require('q');

var TwitterController = function (dataRepositories) {

    function searchTwitterUsers (req,res){

        var client = new Twitter({
            consumer_key: config.twitter.consumerKey,
            consumer_secret: config.twitter.consumerSecret,
            access_token_key: req.user.providerData.token,
            access_token_secret: req.user.providerData.tokenSecret
        });

        //var searchQuery = querystring.stringify({q: req.body.searchString})

        client.get('/users/search',{q: req.body.searchString, page: 1, count: 20}, function(error, matchingUsers, response){
            if(error){
                res.json(error);
                return;
            }
            res.json(matchingUsers);
        });

    }

    function getTweetsByUserID (req,res) {

        var client = new Twitter({
            consumer_key: config.twitter.consumerKey,
            consumer_secret: config.twitter.consumerSecret,
            access_token_key: req.user.providerData.token,
            access_token_secret: req.user.providerData.tokenSecret
        });

        client.get('/statuses/user_timeline',{user_id: req.params.id, count: 20}, function(error, statuses, response){
            if(error){
                res.json({
                    success: false,
                    message: 'Error from twitter',
                    error: error,
                    data: {}
                });
                return;
            }
            res.json({
                success: true,
                message: '',
                data: statuses
            });
        });
    }

    function retweetStatus (req,res) {

        var client = new Twitter({
            consumer_key: config.twitter.consumerKey,
            consumer_secret: config.twitter.consumerSecret,
            access_token_key: req.user.providerData.token,
            access_token_secret: req.user.providerData.tokenSecret
        });

        client.post('statuses/retweet/' + req.params.id, function(error, retweet, response){
            if(error){
                res.json({
                    success: false,
                    message: 'Error from twitter',
                    error: error,
                    data: {}
                });
                return;
            }
            dataRepositories.users.updateById(req.user._id,{retweetsCount: req.user.retweetsCount + 1}).then(function (user) {
                res.json({
                    success: true,
                    message: 'Retweet successful!',
                    data: retweet
                });
            }, function (error) {
                res.json({
                    success: true,
                    message: 'Retweet successful!',
                    data: retweet
                });
            });

        });
    }

    return {
        searchTwitterUsers: searchTwitterUsers,
        getTweetsByUserID: getTweetsByUserID,
        retweetStatus: retweetStatus
    }
};

module.exports = TwitterController;