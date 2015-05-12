#!/usr/bin/env node
'use strict'

var geopkg = require('./lib/geopkg')

var open = process.argv[2]

var error = function (err) {
  if (!err) return
  console.log('ERROR:', err.message)
  process.exit(1)
}

console.log('Gathering location info...')
geopkg.locate(function (err, loc) {
  if (err) return error(err)

  console.log('Found location - lat: %d, long: %d, accuracy: %d', loc.latitude, loc.longitude, loc.accuracy)

  if (open) {
    console.log('Opening location in browser...')
    geopkg.openMaps(loc, error)
  } else {
    console.log('Updating package.json...')
    geopkg.updatePkg(loc, error)
  }
})
