'use strict'

var pkgio = require('package-json-io')
var cli = require('../cli')

exports.run = function () {
  pkgio.read(function (err, data) {
    if (err) return cli.done(err)
    if (!data.coordinates) return cli.done(new Error('package.json doesn\'t contain any existing coordinates'))

    cli.selectLocation(data.coordinates, function (err, loc) {
      if (err) return cli.done(err)
      cli.updatePkgCoordinates(loc, cli.done)
    })
  })
}

exports.desc = 'Edit coordinates in package.json by dragging a marker on a map'
