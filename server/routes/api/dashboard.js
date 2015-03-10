var express = require('express');
var router = express.Router();

//data is the dataRepositories that come from config/routes
module.exports = function (data) {
    //Init needed controller and pass it all data repositories.
    var DashboardController = require('./../../controllers/Dashboard/DashboardController')(data);

    router.route('/')
        .get(DashboardController.getOverviewData);

    router.route('/users')
        .get(DashboardController.getUsersData)

    return router;
};
