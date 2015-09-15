'use strict';

var _ = require('lodash');
var test = require('tap').test;
var obj2arr = require('../');

var schema = require('./schema/arr');
var decoded = require('./data/decoded');
var encoded = require('./data/encoded');

obj2arr.define(schema);

test('#encode', function(t) {
  _.forEach(schema, function(s, type) {
    _.forEach(decoded, function(d, k) {
      var ret = obj2arr.encode(type, d);
      t.similar(ret, encoded[k], 'schema: ' + type + ', data: ' + k);
    });
  });
  t.end();
});
