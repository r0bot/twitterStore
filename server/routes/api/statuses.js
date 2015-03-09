var express = require('express');
var router = express.Router();

//data is the dataRepositories that come from config/routes
module.exports = function (data) {
    //Init needed controller and pass it all data repositories.
    var SavedStatusesController = require('./../../controllers/Tweeter/SavedStatusesController')(data);

    router.route('/')
        .get(SavedStatusesController.getAllForUser);

    router.route('/status')
        .post(SavedStatusesController.saveStatus)
        .delete(SavedStatusesController.removeStatus)

    return router;
};
