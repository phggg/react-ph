#!/usr/bin/env node
const handlebars = require('handlebars')
const fs = require('fs');
const rm = require('rimraf').sync
const store = require('./store')
// store.options.precss

module.exports = function (src) {
  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`))
  }
  return new Promise((resolve, reject) => {
    const fileName = `${src}/config/webpack.config.common.js`;
    const meta = {
      cssLoader: store.cssLoader + '-loader',
    }
    try {
      if (fs.existsSync(fileName)) {
        const content = fs.readFileSync(fileName).toString();
        const result = handlebars.compile(content)(meta);
        fs.writeFileSync(fileName, result);
        resolve()
      }
    } catch (e) {
      rm(src)
      reject(e)
    }
  })
}