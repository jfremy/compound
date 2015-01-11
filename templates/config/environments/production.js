var express = require('express');

module.exports = function (compound) {
    var errorHandler = require("errorhandler");
    var app = compound.app;

    var env = process.env.NODE_ENV || 'development';
    if(env === 'production') {
        app.enable('quiet');
        app.enable('merge javascripts');
        app.enable('merge stylesheets');
        app.disable('assets timestamps');
        app.use(errorHandler());
    }
};
