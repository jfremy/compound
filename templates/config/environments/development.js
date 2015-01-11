var express = require('express');

module.exports = function (compound) {
    var errorHandler = require("errorhandler");
    var app = compound.app;

    var env = process.env.NODE_ENV || 'development';
    if(env === 'development') {
        app.enable('watch');
        app.enable('log actions');
        app.enable('env info');
        app.enable('force assets compilation');
        app.set('translationMissing', 'display');
        app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    }
};
