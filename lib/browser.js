'use strict'

var util = require('util')
var opn = require('opn')

exports.openMapWithDraggableMarker = require('place-geo-marker')

exports.openMap = function (loc, cb) {
  var url = 'https://www.google.com/maps?z=12&t=m&q=loc:%d+%d'
  var isArr = Array.isArray(loc)
  var lat = isArr ? loc[0] : loc.lat
  var lng = isArr ? loc[1] : loc.lng
  opn(util.format(url, lat, lng), { wait: false }, cb)
}
