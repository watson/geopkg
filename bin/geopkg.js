#!/usr/bin/env node
'use strict'

var shared = require('../lib/shared')
var argv = require('../lib/argv')

var cmd = argv._[0] || 'help'

try {
  cmd = require('../lib/commands/' + cmd)
} catch (e) {
  console.error('ERROR: Invalid command: %s\n', cmd)
  console.error(shared.usage())
  process.exit(1)
}

cmd.run()
