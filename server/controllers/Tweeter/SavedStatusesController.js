'use strict';

var Twitter = require('twitter'),
    config = require('../../../config/config'),
    q = require('q');

var SavedStatusesController = function (dataRepositories) {

    function getAllForUser (req, res) {
        var searchData = {
            userID: req.user._id
        };
        dataRepositories.statuses.getAllForUser(searchData).then(function (statuses) {
            res.json({
                success: true,
                message: '',
                data: statuses
            });
        }, function (error) {
            res.json({
                success: false,
                message: 'Error while saving status!',
                error: error
            });
        });

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

    function removeStatus (req, res) {
        //TODO make functionality for removing saved status
    }

    return {
        getAllForUser: getAllForUser,
        saveStatus: saveStatus,
        removeStatus: removeStatus
    }
};

module.exports = SavedStatusesController;