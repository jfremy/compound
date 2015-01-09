express = require 'express'

module.exports = (compound) ->
  app = compound.app

  env = process.env.NODE_ENV || 'development'
  if env == 'development'
    app.enable 'watch'
    app.enable 'log actions'
    app.enable 'env info'
    app.enable 'force assets compilation'
    app.set 'translationMissing', 'display'
    app.use express.errorHandler dumpExceptions: true, showStack: true
