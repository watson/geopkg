'use strict'

var shared = require('../shared')

module.exports = function () {
  shared.getLocation(function (loc) {
    shared.updatePkgCoordinates(loc, shared.done)
  })
}
