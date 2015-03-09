var express = require('express');
var router = express.Router();

module.exports = function (data) {
    var TwitterController = require('./../../controllers/Tweeter/TwitterController')(data);

    router.route('/users/search')
        .post(TwitterController.searchTwitterUsers);

    router.route('/users/statuses/:id')
        .get(TwitterController.getTweetsByUserID);

    router.route('/tweets/retweet/:id')
        .get(TwitterController.retweetStatus);

    return router;
};
