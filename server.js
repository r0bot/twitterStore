var express = require('express');
var config = require('./config/config');

//Init mongooose
require('./config/mongoose');

//Config passport and add strategies to it
require('./config/passport')();

//Config express
var app = require('./config/express')();

//Add the routes to the app
require('./config/routes')(app);

//Init the server
app.listen(config.port, config.ip, function () {
    console.log('====================== Configuration =========================');
    console.log('Environment: ', config.environment);
    console.log('Port: ', config.port);
    console.log('IP: ', config.ip);
    console.log('Database connection string: ', config.db);
    console.log('==============================================================');
});

module.exports = app;
