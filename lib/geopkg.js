'use strict'

var pkglib = require('./package')

exports.locate = require('wifi-triangulate')

exports.updatePkgCoordinates = function (loc, cb) {
  pkglib.load(function (err, pkg) {
    if (err) return cb(err)
    pkg.coordinates = [loc.lat, loc.lng]
    pkglib.save(pkg, cb)
  })
}
