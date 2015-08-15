'use strict'

var cli = require('../cli')

exports.run = function () {
  cli.getAndStoreLocation(cli.done)
}

exports.desc = 'Updates the current package.json with new coordinates'

exports.help = 'Usage:\n' +
  '  geopkg update [options]\n' +
  '\n' +
  'Options:\n' +
  '  -i       Interactive mode: Modify the location by dragging a pin on a map.'
