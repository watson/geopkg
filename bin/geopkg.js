#!/usr/bin/env node
'use strict'

var shared = require('../lib/shared')

var cmd = process.argv[2] || 'help'

try {
  cmd = require('../lib/commands/' + cmd)
} catch (e) {
  console.error('ERROR: Invalid command: %s\n', cmd)
  console.error(shared.usage())
  process.exit(1)
}

cmd()
