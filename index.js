#!/usr/bin/env node
'use strict'

var pkgio = require('package-json-io')
var geopkg = require('./lib/geopkg')
var browser = require('./lib/browser')
var pkg = require('./package')

var cmd = process.argv[2] || 'help'

var usage = pkg.name + ' ' + pkg.version + '\n' +
  pkg.description + '\n\n' +
  'Usage: ' + pkg.name + ' [command]\n\n' +
  'Commands:\n' +
  '  help         Show this help (default)\n' +
  '  update       Updates the current package.json with current coordinates\n' +
  '  open         Opens the coordinates found in package.json in the browser\n' +
  '  preview      Finds your current location and previews it in the browser\n' +
  '  interacive   Choose coordinates interactively by dragging a marker on a map\n'

switch (cmd) {
  case 'help':
    help()
    break
  case 'update':
    update()
    break
  case 'open':
    open()
    break
  case 'preview':
    preview()
    break
  case 'interactive':
    interactive()
    break
  default:
    _done(new Error('Unknown command ' + cmd))
}

function help () {
  console.log(usage)
  process.exit()
}

function update () {
  _getLocation(function (loc) {
    console.log('Updating package.json...')
    geopkg.updatePkgCoordinates(loc, _done)
  })
}

function open () {
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

    browser.openMap(data.coordinates, _done)
  })
}

function preview () {
  _getLocation(function (loc) {
    console.log('Opening location in browser...')
    browser.openMap(loc, _done)
  })
}

function interactive () {
  pkgio.read(function (err, data) {
    if (err) return _done(err)

    if (data.coordinates) {
      selectCoordsInteractively({ lat: data.coordinates[0], lng: data.coordinates[1] })
    } else {
      _getLocation(selectCoordsInteractively)
    }

    function selectCoordsInteractively (loc) {
      console.log('Opening location in browser...')
      browser.openMapWithDraggableMarker(loc, function (err, newLoc) {
        if (err) return _done(err)
        console.log('Updating package.json...')
        geopkg.updatePkgCoordinates(newLoc, _done)
      })
    }
  })
}

function _getLocation (cb) {
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

function _done (err) {
  if (!err) return process.exit()
  console.error('ERROR: %s\n', err.message)
  console.error(usage)
  process.exit(1)
}
