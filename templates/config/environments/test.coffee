express = require 'express'

module.exports = (compound) ->
  app = compound.app
  env = process.env.NODE_ENV || 'development';
  if env == 'test'
    app.enable 'quiet'
    app.enable 'view cache'
    app.enable 'model cache'
    app.enable 'eval cache'
    app.use express.errorHandler dumpExceptions: true, showStack: true
