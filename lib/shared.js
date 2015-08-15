'use strict'

var browser = require('./browser')
var geopkg = require('./geopkg')
var pkg = require('../package')

exports.usage = pkg.name + ' ' + pkg.version + '\n' +
  pkg.description + '\n\n' +
  'Usage: ' + pkg.name + ' [options] [command]\n\n' +
  'Commands:\n' +
  '  help     Show this help (default)\n' +
  '  update   Updates the current package.json with new coordinates\n' +
  '  edit     Edit coordinates in package.json by dragging a marker on a map\n' +
  '  view     Opens the coordinates found in package.json in the browser\n' +
  '  preview  Finds your current location and previews it in the browser\n'

exports.getLocation = function (cb) {
  console.log('Gathering location info...')

  geopkg.locate(function (err, loc) {
    if (err || !loc) {
      console.error('\nERROR: Could not find your location!')
      console.error('Your wifi needs to be turned on for %s to find your location', pkg.name)
      console.error('If the problem persists, please open an issue at:\n\n  %s\n', pkg.bugs.url)
      console.error('- Remember to specify your OS and hardware')

      if (err) {
        console.error('\nDetailed error message:\n')
        console.error(err.stack)
      }

      process.exit(1)
      return
    }

    console.log('Found location - lat: %d, long: %d, accuracy: %d', loc.lat, loc.lng, loc.accuracy)

    cb(loc)
  })
}

exports.selectLocation = function (loc, cb) {
  console.log('Opening interactive map in browser...')
  browser.openMapWithDraggableMarker({ lat: loc[0], lng: loc[1] }, cb)
}

exports.updatePkgCoordinates = function (loc, cb) {
  console.log('Updating package.json...')
  geopkg.updatePkgCoordinates(loc, cb)
}

exports.done = function (err) {
  if (!err) return process.exit()
  console.error('ERROR: %s\n', err.message)
  console.error(exports.usage)
  process.exit(1)
}
