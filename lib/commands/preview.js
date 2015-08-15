'use strict'

var shared = require('../shared')
var browser = require('../browser')

exports.run = function () {
  shared.getLocation(function (loc) {
    console.log('Opening location in browser...')
    browser.openMap(loc, shared.done)
  })
}

exports.desc = 'Finds your current location and previews it in the browser'
