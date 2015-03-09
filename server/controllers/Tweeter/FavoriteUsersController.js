'use strict';

var Twitter = require('twitter'),
    config = require('../../../config/config'),
    q = require('q');

var FavoriteUsersController = function (dataRepositories) {

    function getAll (req,res){

        var userFavorites = req.user.favoriteTwitterUsers;

        if(userFavorites.length > 0){
            var client = new Twitter({
                consumer_key: config.twitter.consumerKey,
                consumer_secret: config.twitter.consumerSecret,
                access_token_key: req.user.providerData.token,
                access_token_secret: req.user.providerData.tokenSecret
            });

            client.post('users/lookup',{user_id: userFavorites.join()}, function(error, favoriteUsers, response){
                if(error){
                    res.json({
                        success: false,
                        message: 'Error from twitter!',
                        error: error,
                        data: {}
                    });
                }
                res.json({
                    success: true,
                    message: '',
                    data: favoriteUsers
                });
            });
        }else{
            res.json({
                success: false,
                message: 'User has no favorites!'
            });
        }

    }

    function getTweetsByUser () {

    }

    function addFavoriteUser (req, res) {
        var userFavorites = req.user.favoriteTwitterUsers;
        userFavorites.push(req.body.twitterUserID);

        dataRepositories.users.updateById(req.user._id,{favoriteTwitterUsers:userFavorites}).then(function (user) {
            res.json({
                success: true,
                message: 'User added to favorites!'
            });
        });
    }

    function removeFavoriteUser () {
        //TODO make functionality for removing favorite user
    }

    function saveStatus (req, res) {
        var statusObject = {
            userID: req.user._id,
            statusID: req.body.statusData.id_str,
            statusData: req.body.statusData
        };

        dataRepositories.statuses.saveStatus(statusObject).then(function (status) {
                res.json({
                    success: true,
                    message: 'Status saved!'
                });
            }, function (error) {
                res.json({
                    success: false,
                    message: 'Error while saving status!',
                    error: error
                });
            });

    }

    function deleteStatus (req, res) {
        //TODO make functionality for removing saved status
    }

    return {
        getAll: getAll,
        getTweetsByUser: getTweetsByUser,
        addFavoriteUser: addFavoriteUser,
        removeFavoriteUser: removeFavoriteUser,
        saveStatus: saveStatus,
        deleteStatus: deleteStatus
    }
};

module.exports = FavoriteUsersController;