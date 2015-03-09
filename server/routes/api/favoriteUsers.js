var express = require('express');
var router = express.Router();

module.exports = function (data) {
    var FavoriteUsersController = require('./../../controllers/Tweeter/FavoriteUsersController')(data);

    router.route('/')
        .get(FavoriteUsersController.getAll);

    router.route('/user')
        .post(FavoriteUsersController.addFavoriteUser)
        .delete(FavoriteUsersController.removeFavoriteUser);

    router.route('/status')
        .post(FavoriteUsersController.saveStatus)
        .delete(FavoriteUsersController.deleteStatus);

    return router;
};
