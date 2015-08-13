'use strict'

var fs = require('fs')
var os = require('os')
var path = require('path')

exports.load = function (cb) {
  fs.exists(pkgFile(), function (exists) {
    if (!exists) return cb(new Error('No package.json.found'))

    fs.readFile(pkgFile(), function (err, data) {
      if (err) return cb(err)

      try {
        data = JSON.parse(data)
      } catch (e) {
        return cb(new Error('No valid package.json found'))
      }

      cb(null, data)
    })
  })
}

exports.save = function (data, cb) {
  data = JSON.stringify(data, null, 2)
  fs.writeFile(pkgFile(), data + os.EOL, cb)
}

// evaluate every time in case cwd changes - mostly useful when testing
function pkgFile () {
  return path.join(process.cwd(), 'package.json')
}
