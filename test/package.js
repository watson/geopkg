'use strict'

var fs = require('fs')
var os = require('os')
var path = require('path')
var test = require('tape')
var pkglib = require('../lib/package')

test('pkglib.read', function (t) {
  var dir = os.tmpdir()
  var file = path.join(dir, 'package.json')
  process.chdir(dir)
  fs.writeFile(file, '{"name":"testing"}', function (err) {
    t.error(err)
    pkglib.load(function (err, pkg) {
      t.error(err)
      t.equal(pkg.name, 'testing')
      t.end()
    })
  })
})

test('pkglib.save', function (t) {
  var dir = os.tmpdir()
  var file = path.join(dir, 'package.json')
  var now = Date.now()
  var pkg = { foo: now }
  process.chdir(dir)
  pkglib.save(pkg, function (err) {
    t.error(err)
    fs.readFile(file, function (err, data) {
      t.error(err)
      data = JSON.parse(data)
      t.equal(data.foo, now)
      t.end()
    })
  })
})
