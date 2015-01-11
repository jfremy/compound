module.exports = (compound) ->

  express = require 'express'
  methodOverride = require 'method-override'
  session = require 'express-session'
  bodyParser = require 'body-parser'
  cookieParser = require 'cookie-parser'
  app = compound.app

  app.enable 'coffee'

  app.set 'cssEngine', '{{ CSSENGINE }}'
  compound.loadConfigs __dirname

  # make sure you run `npm install railway-routes browserify`
  # app.enable 'clientside'
  app.use express.static(app.root + '/public', maxAge: 86400000)
  app.use bodyParser.urlencoded extended: true
  app.use bodyParser.json()
  app.use cookieParser 'secret'
  app.use session {secret: 'secret', resave: false, saveUninitialized: true}
  app.use methodOverride (req) ->
    if req.body && typeof req.body == 'object' && '_method' in req.body
      method = req.body._method
      delete req.body._method
      return method
  app.use app.router
