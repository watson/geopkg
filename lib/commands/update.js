'use strict'

var shared = require('../shared')

module.exports = function () {
  shared.getAndStoreLocation(shared.done)
}
