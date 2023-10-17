'use strict';

const fecha = require('fecha');
const format = require('./format');

/*
 * function timestamp (info)
 * Returns a new instance of the timestamp Format which adds a timestamp
 * to the info. It was previously available in winston < 3.0.0 as:
 *
 * - { timestamp: true }             // `new Date.toISOString()`
 * - { timestamp: function:String }  // Value returned by `timestamp()`
 */
module.exports = format((info, opts = {}) => {
  if (opts.format) {
    info.timestamp = typeof opts.format === 'function'
      ? opts.format()
      : fecha.format(new Date(), opts.format);
  }

  if (!info.timestamp) {
    const dt = new Date();
    let diffTZ = dt.getTimezoneOffset();
    info.timestamp = new Date(dt.getTime() - diffTZ*60000)
  }

  if (opts.alias) {
    info[opts.alias] = info.timestamp;
  }

  return info;
});
