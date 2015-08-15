'use strict'

var shared = require('../shared')
var browser = require('../browser')

module.exports = function () {
  shared.getLocation(function (loc) {
    console.log('Opening location in browser...')
    browser.openMap(loc, shared.done)
  })
}
