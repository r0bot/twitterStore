
module.exports = function (app, passport) {

    //Get data repositories, so they can be passed to route definitions, so they can them or pass them to controllers.
    var dataRepositories = require('./../server/dataRepositories');

    //Get authentication controller and plug isLoggedIn function as a middleware for routes that require authentication
    var authController = require('./../server/controllers/Authentication/AuthenticationController')(passport);

    //Get route deinitions
    var routes = require('./../server/routes');
    var auth = require('./../server/routes/auth')(passport);

    var users = require('./../server/routes/api/users')(dataRepositories);
    var favoriteUsers = require('./../server/routes/api/favoriteUsers')(dataRepositories);
    var statuses = require('./../server/routes/api/statuses')(dataRepositories);
    var twitter = require('./../server/routes/api/twitter')(dataRepositories);
    var dashboard = require('./../server/routes/api/dashboard')(dataRepositories);

    //Basic app routes
    app.use('/', routes);
    app.use('/auth', auth);

    //Middleware to check if user is authenticated
    app.use('/api/*', authController.isAuthenticated);

    //Users routes
    app.use('/api/users', users);
    //Dashboard routes
    app.use('/api/favoriteUsers', favoriteUsers);

    //Middleware to check if user is admin
    app.use('/api/dashboard/*', authController.isAdmin);

    //Favorite users routes
    app.use('/api/dashboard', dashboard);
    //Statuses routes
    app.use('/api/statuses', statuses);
    //Tweeter routes
    app.use('/api/twitter', twitter);

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};