
module.exports = function (app, passport) {

    //Get data repositories, so they can be passed to route definitions, so they can them or pass them to controllers.
    var dataRepositories = require('./../server/dataRepositories');

    var routes = require('./../server/routes');
    var auth = require('./../server/routes/auth')(passport);

    var users = require('./../server/routes/api/users')(dataRepositories);
    var favoriteUsers = require('./../server/routes/api/favoriteUsers')(dataRepositories);
    var statuses = require('./../server/routes/api/statuses')(dataRepositories);
    var twitter = require('./../server/routes/api/twitter')(dataRepositories);

    //Basic app routes
    app.use('/', routes);
    app.use('/auth', auth);
    app.use('/api/users', users);

    //Tweeter related routes
    app.use('/api/favoriteUsers', favoriteUsers);
    app.use('/api/statuses', statuses);
    app.use('/api/twitter', twitter);

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};