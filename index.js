#!/usr/bin/env node
'use strict'

var geopkg = require('./lib/geopkg')
var pkg = require('./package')

var open = process.argv[2]

var error = function (err) {
  if (!err) return
  console.log('ERROR:', err.message)
  process.exit(1)
}

console.log('Gathering location info...')
geopkg.locate(function (err, loc) {
  if (err) return error(err)

  if (!loc) {
    console.log('\nERROR: Could not find your location!')
    console.log('Your wifi needs to be turned on for %s to find your location', pkg.name)
    console.log('If the problem persists, please open an issue at:\n\n  %s\n', pkg.bugs.url)
    console.log('- Remember to specify your OS and hardware')
    process.exit(1)
    return
  }

  console.log('Found location - lat: %d, long: %d, accuracy: %d', loc.lat, loc.lng, loc.accuracy)

  if (open) {
    console.log('Opening location in browser...')
    geopkg.openMaps(loc, error)
  } else {
    console.log('Updating package.json...')
    geopkg.updatePkg(loc, error)
  }
})
