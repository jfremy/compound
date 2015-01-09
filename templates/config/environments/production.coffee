express = require 'express'

module.exports = (compound) ->
  app = compound.app
  env = process.env.NODE_ENV || 'development'
  if env == 'production'
    app.enable 'quiet'
    app.enable 'merge javascripts'
    app.enable 'merge stylesheets'
    app.disable 'assets timestamps'
    app.use express.errorHandler()
