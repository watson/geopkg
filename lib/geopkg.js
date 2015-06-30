'use strict'

var os = require('os')
var util = require('util')
var path = require('path')
var fs = require('fs')
var opn = require('opn')

exports.locate = require('wifi-triangulate')

exports.openMaps = function (loc, cb) {
  var url = 'https://www.google.com/maps?z=12&t=m&q=loc:%d+%d'
  var isArr = Array.isArray(loc)
  var lat = isArr ? loc[0] : loc.lat
  var lng = isArr ? loc[1] : loc.lng
  opn(util.format(url, lat, lng), { wait: false }, cb)
}

exports.updatePkg = function (loc, cb) {
  var packageFile = path.join(process.cwd(), 'package.json')

  fs.exists(packageFile, function (exists) {
    if (!exists) return cb(new Error('Could not locate package.json in your current working directory:', process.cwd()))

    fs.readFile(packageFile, function (err, data) {
      if (err) return cb(err)

      if (data) data = data.toString()
      try {
        data = JSON.parse(data)
      } catch (e) {
        return cb(new Error('Could not parse package.json'))
      }

      data.coordinates = [loc.lat, loc.lng]
      data = JSON.stringify(data, null, 2)

      fs.writeFile(packageFile, data + os.EOL, cb)
    })
  })
}
