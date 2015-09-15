'use strict';

var _ = require('lodash');
var test = require('tap').test;
var obj2arr = require('../');

var schema = require('./schema/arr');
var decoded = require('./data/decoded');
var encoded = require('./data/encoded');

obj2arr.define(schema);

test('#decode', function(t) {
  _.forEach(schema, function(s, type) {
    var ret = obj2arr.decode(type, encoded.full);
    t.similar(ret, decoded.full, 'schema: ' + type + ', data: full');
  });
  t.end();
});
