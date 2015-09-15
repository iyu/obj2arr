'use strict';

var _ = require('lodash');
var test = require('tap').test;
var toArrSchema = require('../').tools.toArrSchema;

var idealSchema = require('./schema/ideal');
var objSchema = require('./schema/obj');

test('tools#toArrSchema', function(t) {
  var ret = toArrSchema(objSchema.full);
  t.similar(ret, idealSchema);
  t.end();
});
