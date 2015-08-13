'use strict'

var pkgio = require('package-json-io')

exports.locate = require('wifi-triangulate')

exports.updatePkgCoordinates = function (loc, cb) {
  pkgio.read(function (err, pkg) {
    if (err) return cb(err)
    pkg.coordinates = [loc.lat, loc.lng]
    pkgio.update(pkg, cb)
  })
}
