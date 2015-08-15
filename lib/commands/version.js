'use strict'

var bump = require('npm-version-bump')
var pkgio = require('package-json-io')
var shared = require('../shared')
var argv = require('../argv')

module.exports = function () {
  var cmd = argv._[1]

  if (!cmd) return shared.done(new Error('No version bump command specified'))

  bump(process.cwd(), cmd, shared.getAndStoreLocation, aftercommit)

  function aftercommit (err) {
    if (err) return shared.done(err)
    pkgio.read(function (err, pkg) {
      if (err) return shared.done(err)
      console.log('v%s @ %s/%s', pkg.version, pkg.coordinates[0], pkg.coordinates[1])
      shared.done()
    })
  }
}
