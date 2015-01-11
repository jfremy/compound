module.exports = function (compound) {

    var express = require('express');
    var methodOverride = require('method-override');
    var session = require('express-session');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var app = compound.app;

    app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.set('cssEngine', '{{ CSSENGINE }}');
    compound.loadConfigs(__dirname);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser('secret'));
    app.use(session({secret: 'secret', resave: false, saveUninitialized: true }));
    app.use(methodOverride(function(req){
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

};
