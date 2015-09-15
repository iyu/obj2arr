'use strict';

var _ = require('lodash');

var defMap = {};

/**
 * @param {Object|Array} def
 * @param {Object|Array} data
 */
function toArray(def, data) {
  if (_.isArray(def)) {
    return _.map(def, function(sc) {
      return toArray(sc, data);
    });
  }

  if (!_.isString(def.type)) {
    return _.transform(def, function(result, sc, key) {
      sc.id = sc.id || key;
      result[sc.id] = toArray(sc, data);
    });
  }

  if (def.id) {
    data = data[def.id];
  }
  if (data === undefined || data === null) {
    data = _.has(def, 'default') ? def.default : null;
  }

  if (def.type === 'object') {
    return toArray(def.properties, data);
  }
  if (def.type === 'array') {
    if (_.isArray(def.items)) {
      return toArray(def.items, data);
    }
    return _.map(data, function(d) {
      delete def.items.id;
      return toArray(def.items, d);
    });
  }

  return data;
}

/**
 * @param {Object|Array} def
 * @param {*} data
 */
function toObject(def, data) {
  if (_.isArray(def)) {
    return _.transform(def, function(result, sc, index) {
      result[sc.id] = toObject(sc, data[index]);
    }, {});
  }

  if (!_.isString(def.type)) {
    return _.transform(def, function(result, sc, key) {
      sc.id = sc.id || key;
      result[sc.id] = toObject(sc, data[sc.id]);
    });
  }

  if (def.type === 'object') {
    return toObject(def.properties, data);
  }
  if (def.type === 'array') {
    if (_.isArray(def.items)) {
      return toObject(def.items, data);
    }
    return _.map(data, function(d) {
      return toObject(def.items, d);
    });
  }

  return data;
}

/**
 * @param {Object} defs - schema definition
 */
exports.define = function(defs) {
  _.forEach(defs, function(def, type) {
    defMap[type] = def;
  });
  return defMap;
};

/**
 * @param {string} type - schema type
 * @param {Object} data
 */
exports.encode = function(type, data) {
  if (!defMap[type]) {
    return data;
  }

  try {
    return toArray(defMap[type], data);
  } catch (e) {
    var error = new Error('invalid format data.');
    error.code = 'encode.' + type;
    error.stack = e.stack;
    throw error;
  }
};

/**
 * @param {string} type - schema type
 * @param {Object|Array} data
 */
exports.decode = function(type, data) {
  if (!defMap[type]) {
    return data;
  }

  try {
    return toObject(defMap[type], data);
  } catch (e) {
    var error = new Error('invalid format data.');
    error.code = 'decode.' + type;
    error.stack = e.stack;
    throw error;
  }
};