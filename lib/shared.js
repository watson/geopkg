'use strict'

var fs = require('fs')
var path = require('path')
var printf = require('printf')
var wordwrap = require('wordwrap')
var indent = require('indent-string')
var browser = require('./browser')
var geopkg = require('./geopkg')
var argv = require('./argv')
var pkg = require('../package')

exports.usage = function () {
  var usage = pkg.name + ' v' + pkg.version + '\n' +
    pkg.description + '\n\n' +
    'Usage: ' + pkg.name + ' [command]\n\n' +
    'Commands:\n'

  var files = fs.readdirSync(path.join(__dirname, 'commands'))
  var commands = files.map(function (file) {
    return file.replace(/\.js$/, '')
  })
  var maxWidth = commands.reduce(function (max, cmd) {
    return cmd.length > max ? cmd.length : max
  }, 0)
  var wrap = wordwrap(79 - maxWidth - 4)

  commands.forEach(function (name) {
    var cmd = require('./commands/' + name)
    usage += printf('  %*s', name, maxWidth * -1)
    usage += '  ' + indent(wrap(cmd.desc), ' ', maxWidth + 4).trim() + '\n'
  })

  return usage
}

exports.getAndStoreLocation = function (cb) {
  exports.getLocation(function (loc) {
    if (argv.i) {
      exports.selectLocation([loc.lat, loc.lng], function (err, loc) {
        if (err) return cb(err)
        exports.updatePkgCoordinates(loc, cb)
      })
    } else {
      exports.updatePkgCoordinates(loc, cb)
    }
  })
}

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
  console.error(exports.usage())
  process.exit(1)
}
