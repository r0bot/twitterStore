'use strict';

var Twitter = require('twitter'),
    config = require('../../../config/config'),
    q = require('q');

var DashboardController = function (dataRepositories) {

    function getOverviewData (req,res){
        //TODO this can be optimized by incrementing counter for saved statuses in the user model. Rather than doing it on demand.
        var overviewData = {
            overview : {
                totalUsers: 0,
                totalRetweets: 0,
                totalSavedItems: 0
            }
        };
        //Get all users
        dataRepositories.users.getAll().then(function (users) {
            var usersData = {};
            //Map users in array by id
            users.forEach(function (user) {
                //Increment the total of related items
                overviewData.overview.totalUsers = overviewData.overview.totalUsers + 1;
                overviewData.overview.totalRetweets = overviewData.overview.totalUsers + user.retweetsCount;
                //Get object from the model
                usersData[user._id] = user.toObject();

            });
            //Get all statuses
            dataRepositories.statuses.getAll().then(function (statuses) {
                //For each status increment a counter in its related user
                statuses.forEach(function (status) {
                    if(!usersData[status.userID].savedItems){
                        usersData[status.userID].savedItems = 0;
                    };
                    //Increment the total saved items
                    overviewData.overview.totalSavedItems = overviewData.overview.totalSavedItems + 1;
                    usersData[status.userID].savedItems = usersData[status.userID].savedItems + 1;
                });
                overviewData.users = usersData;
                res.json({
                    success: true,
                    data: overviewData
                });
            })
        });

    }

    function getUsersData (req,res) {

    }

    return {
        getOverviewData: getOverviewData,
        getUsersData: getUsersData
    }
};

module.exports = DashboardController;