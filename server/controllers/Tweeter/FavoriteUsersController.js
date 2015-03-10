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

    function removeFavoriteUser (req, res) {
        var userFavorites = req.user.favoriteTwitterUsers;

        var indexOfUser = userFavorites.indexOf(req.body.userID);
        if(indexOfUser > -1){
            userFavorites.splice(indexOfUser,1);
        }else{
            res.json({
                success: false,
                message: 'User not in favorites!'
            });
        }


        dataRepositories.users.updateById(req.user._id,{favoriteTwitterUsers:userFavorites}).then(function (user) {
            res.json({
                success: true,
                message: 'User removed from favorites!'
            });
        });
    }

    return {
        getAll: getAll,
        addFavoriteUser: addFavoriteUser,
        removeFavoriteUser: removeFavoriteUser
    }
};

module.exports = FavoriteUsersController;