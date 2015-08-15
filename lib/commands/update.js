'use strict'

var shared = require('../shared')

module.exports = function () {
  shared.getLocation(function (loc) {
    if (argv.i) {
      shared.selectLocation([loc.lat, loc.lng], function (err, loc) {
        if (err) return shared.done(err)
        shared.updatePkgCoordinates(loc, shared.done)
      })
    } else {
      shared.updatePkgCoordinates(loc, shared.done)
    }
  })
}
