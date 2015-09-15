'use strict';

var _ = require('lodash');

/**
 * @param {Object|Array} def
 */
function toArrSchema(def) {
  if (!_.isString(def.type)) {
    return _.map(def, function(sc, key) {
      return _.assign({ id: key }, toArrSchema(sc));
    });
  }
  if (def.type === 'object') {
    return _.assign({}, _.omit(def, 'properties'), {
      type: 'array',
      items: toArrSchema(def.properties)
    });
  }
  if (def.type === 'array') {
    return _.assign({}, def, { items: toArrSchema(def.items) });
  }

  return def;
}

/**
 * @param {Object|Array} def
 */
function toObjSchema(def) {
  if (_.isArray(def)) {
    return _.transform(def, function(result, sc) {
      result[sc.id] = toObjSchema(sc);
    }, {});
  }
  if (!_.isString(def.type)) {
    return _.transform(def, function(result, sc, key) {
      result[key] = toObjSchema(sc);
    });
  }
  if (def.type === 'array') {
    if (_.isArray(def.items)) {
      return _.assign({}, _.omit(def, 'items'), {
        type: 'object',
        properties: toObjSchema(def.items)
      });
    }
    return _.assign({}, def, { items: toObjSchema(def.items) });
  }
  if (def.type === 'object') {
    return _.assign({}, def, { properties: toObjSchema(def.properties) });
  }

  return def;
}

exports.toArrSchema = toArrSchema;

exports.toObjSchema = toObjSchema;
