'use strict'

var cli = require('../cli')
var argv = require('../argv')

exports.run = function () {
  var cmd = argv._[1]

  if (cmd) {
    try {
      cmd = require('./' + cmd)
    } catch (e) {
      console.error('ERROR: Invalid command: %s\n', cmd)
      console.error(cli.usage())
      process.exit(1)
    }
    console.log(cmd.desc)
    if (cmd.help) console.log('\n%s', cmd.help)
  } else {
    console.log(cli.usage())
  }

  process.exit()
}

exports.desc = 'Get help for specific command. Run: geopkg help [command]'
