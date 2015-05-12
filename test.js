'use strict'

var os = require('os')
var fs = require('fs')
var path = require('path')
var test = require('tape')
var geopkg = require('./lib/geopkg')

test('#locate()', function (t) {
  geopkg.locate(function (err, loc) {
    t.error(err)
    t.equals(typeof loc, 'object')
    t.ok(Number.isFinite(loc.accuracy))
    t.ok(Number.isFinite(loc.latitude))
    t.ok(Number.isFinite(loc.longitude))
    t.end()
  })
})

test('#updatePkg()', function (t) {
  var dir = os.tmpdir()
  var file = path.join(dir, 'package.json')
  process.chdir(dir)
  fs.writeFile(file, '{"foo":"bar"}', function (err) {
    t.error(err)
    geopkg.updatePkg({ accuracy: 10, latitude: 1.1, longitude: 1.2 }, function (err) {
      t.error(err)
      fs.readFile(file, function (err, data) {
        t.error(err)
        try {
          data = JSON.parse(data)
        } catch (e) {
          t.error(e)
        }
        t.equals(data.foo, 'bar')
        t.deepEquals(data.location, [1.1, 1.2])
        t.end()
      })
    })
  })
})

test('bin', function (t) {
  var oldLocate = geopkg.locate
  geopkg.locate = function (cb) {
    t.equals(typeof cb, 'function')
    geopkg.locate = oldLocate
    t.end()
  }
  require('./index')
})
