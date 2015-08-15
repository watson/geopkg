'use strict'

var shared = require('../shared')

exports.run = function () {
  shared.getAndStoreLocation(shared.done)
}

exports.desc = 'Updates the current package.json with new coordinates'

exports.help = 'Usage:\n' +
  '  geopkg update [options]\n' +
  '\n' +
  'Options:\n' +
  '  -i       Interactive mode: Modify the location by dragging a pin on a map.'
