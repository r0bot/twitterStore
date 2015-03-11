var Q = require('q');
var mongoose = require('mongoose');

var Status = require('./../../models/Status/Status');

function getAll () {
    var deferred = Q.defer();
    //Get all statuses for user based on user ID
    Status
        .find({}, function (error, statuses) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(statuses);
        });

    return deferred.promise;
}

function getAllForUser (params) {
    var deferred = Q.defer();
    //Get all statuses for user based on user ID
    Status
        .find({userID:params.userID}, function (error, statuses) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(statuses);
        });

    return deferred.promise;
}

function saveStatus (params) {
    var deferred = Q.defer();

    //Check if this status has been already saved for the user
    Status
        .find({userID:params.userID, statusID:params.statusID}, function (error, status) {
            if (error) {
                deferred.reject(error);
            }
            //If status is not found save it. Else return message that it already exists
            if(status.length == 0){
                var status = new Status(params);
                status.save(function (error, savedUser) {
                    if (error) {
                        deferred.reject(error);
                        return;
                    }

                    deferred.resolve(savedUser);
                });

            }else{
                deferred.reject('Status already saved!');
            }
            deferred.resolve(status);
        });


    return deferred.promise;
}


module.exports = {
    name: 'statuses',
    data: {
        getAll: getAll,
        getAllForUser: getAllForUser,
        saveStatus: saveStatus
    }
};