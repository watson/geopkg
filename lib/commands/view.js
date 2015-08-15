'use strict'

var pkgio = require('package-json-io')
var cli = require('../cli')
var browser = require('../browser')

exports.run = function () {
  pkgio.read(function (err, data) {
    if (!err && !data.coordinates) {
      err = new Error('The package.json doesn\'t contain any coordinates')
    }

    if (err) {
      console.error('ERROR:', err.message)
      console.error('To view your current location, type `geopkg preview`')
      process.exit(1)
      return
    }

    browser.openMap(data.coordinates, cli.done)
  })
}

exports.desc = 'Opens the coordinates found in package.json in the browser'
