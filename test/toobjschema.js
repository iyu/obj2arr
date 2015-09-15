'use strict';

var _ = require('lodash');
var test = require('tap').test;
var toObjSchema = require('../').tools.toObjSchema;

var arrSchema = require('./schema/arr');
var objSchema = require('./schema/obj');

test('tools#toObjSchema', function(t) {
  var ret = toObjSchema(arrSchema.full);
  t.similar(ret, objSchema.full);
  t.end();
});
