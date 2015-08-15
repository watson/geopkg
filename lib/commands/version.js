'use strict'

var bump = require('npm-version-bump')
var pkgio = require('package-json-io')
var cli = require('../cli')
var argv = require('../argv')

exports.run = function () {
  var cmd = argv._[1]

  if (!cmd) return cli.done(new Error('No version bump command specified'))

  bump(process.cwd(), cmd, cli.getAndStoreLocation, aftercommit)

  function aftercommit (err) {
    if (err) return cli.done(err)
    pkgio.read(function (err, pkg) {
      if (err) return cli.done(err)
      console.log('v%s @ %s/%s', pkg.version, pkg.coordinates[0], pkg.coordinates[1])
      cli.done()
    })
  }
}

exports.desc = 'Bump the version and update the coordinates in a single commit'

exports.help = 'Usage:\n' +
  '  geopkg version (<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease) [options]\n' +
  '\n' +
  'Options:\n' +
  '  -i       Interactive mode: Modify the location by dragging a pin on a map.'
