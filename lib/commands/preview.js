'use strict'

var cli = require('../cli')
var browser = require('../browser')

exports.run = function () {
  cli.getLocation(function (loc) {
    console.log('Opening location in browser...')
    browser.openMap(loc, cli.done)
  })
}

exports.desc = 'Finds your current location and previews it in the browser'
