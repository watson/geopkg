'use strict'

var util = require('util')
var path = require('path')
var fs = require('fs')
var gps = require('wifi-location')
var opn = require('opn')

exports.locate = function (cb) {
  gps.getTowers(function (err, towers) {
    if (err) return cb(err)
    gps.getLocation(towers, cb)
  })
}

exports.openMaps = function (loc, cb) {
  var url = 'https://www.google.com/maps?z=12&t=m&q=loc:%d+%d'
  opn(util.format(url, loc.latitude, loc.longitude), cb)
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

      data.location = [loc.latitude, loc.longitude]
      data = JSON.stringify(data, null, 2)

      fs.writeFile(packageFile, data, cb)
    })
  })
}
