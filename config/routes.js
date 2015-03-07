
module.exports = function (app, passport) {

    var dataRepositories = require('./../server/dataRepositories');

    var routes = require('./../server/routes');
    var auth = require('./../server/routes/auth')(passport);

    var users = require('./../server/routes/api/users')(dataRepositories);

    app.use('/', routes);
    app.use('/auth', auth);

    app.use('/api/users', users);

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};