'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFunction = function isFunction(input) {
  return typeof input === 'function';
};

exports.default = function (predicate) {
  return function (elemOrThunk) {
    return predicate ? isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk : null;
  };
};

module.exports = exports['default'];