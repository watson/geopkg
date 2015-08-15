'use strict'

var pkgio = require('package-json-io')
var shared = require('../shared')

exports.run = function () {
  pkgio.read(function (err, data) {
    if (err) return shared.done(err)
    if (!data.coordinates) return shared.done(new Error('package.json doesn\'t contain any existing coordinates'))

    shared.selectLocation(data.coordinates, function (err, loc) {
      if (err) return shared.done(err)
      shared.updatePkgCoordinates(loc, shared.done)
    })
  })
}

exports.desc = 'Edit coordinates in package.json by dragging a marker on a map'