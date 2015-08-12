#!/usr/bin/env node
'use strict'

var geopkg = require('./lib/geopkg')
var pkg = require('./package')

var cmd = process.argv[2] || 'update'

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
    _unknown(cmd)
}

function help () {
  console.log(
    pkg.name + ' ' + pkg.version + '\n' +
    pkg.description + '\n\n' +
    'Usage: ' + pkg.name + ' [command]\n\n' +
    'If no commands are given, the default "update" command is run\n\n' +
    'Commands:\n' +
    '  help         Show this help\n' +
    '  update       Updates the current package.json with current coordinates\n' +
    '  open         Opens the coordinates found in package.json in the browser\n' +
    '  preview      Finds your current location and previews it in the browser\n' +
    '  interacive   Choose coordinates interactively by dragging a marker on a map\n'
  )
  process.exit()
}

function update () {
  _getLocation(function (loc) {
    console.log('Updating package.json...')
    geopkg.updatePkg(loc, _done)
  })
}

function open () {
  var currentPkg = geopkg.getPackage()
  if (currentPkg && currentPkg.coordinates) {
    return geopkg.openMaps(currentPkg.coordinates, _done)
  }

  if (!currentPkg) {
    console.error('Could not find a package.json in the current working directory!')
  } else {
    console.log('The current package.json doesn\'t contain any coordinates!')
  }

  console.error('To view your current location, type `geopkg preview`')
  process.exit(1)
}

function preview () {
  _getLocation(function (loc) {
    console.log('Opening location in browser...')
    geopkg.openMaps(loc, _done)
  })
}

function interactive () {
  var currentCoords = geopkg.getPackageCoords()
  if (currentCoords) {
    currentCoords = { lat: currentCoords[0], lng: currentCoords[1] }
    selectCoordsInteractively(currentCoords)
  } else {
    _getLocation(selectCoordsInteractively)
  }

  function selectCoordsInteractively (loc) {
    console.log('Opening location in browser...')
    geopkg.openMapWithDraggableMarker(loc, function (err, newLoc) {
      if (err) return _done(err)
      console.log('Updating package.json...')
      geopkg.updatePkg(newLoc, _done)
    })
  }
}

function _unknown (cmd) {
  console.error('Unknown command %s', cmd)
  console.error('Run `geopkg help` for more information')
  process.exit(1)
  return
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
  if (!err) return
  console.error('ERROR:', err.message)
  process.exit(1)
}
