#!/usr/bin/env node
// 根据配置写入文件

const fs = require('fs-extra');
const store = require('./store');
const version = require('../package.json').version;
const { pro } = store

// index.html 模板文件
const htmlTemp = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${store.dirname}</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`;

// package.json
const packageTemp = `{
    "name": "${store.dirname}",
    "version": "${pro.version}",
    "description": "${pro.description}",
    "author": "${pro.author}",
    "main": "index.js",
    "sideEffects": [
      "*.css",
      "*.scss"
    ],
    "scripts": {
        "start": "cross-env NODE_ENV=development webpack-dev-server --config ./config/webpack.config.dev.js --env.mode=development",
        "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.prod.js",
        "build:dll": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.dll.js"
    },
    "license": "ISC"
}
`;

// tsconfig.json
const tsTemp = `{
    "compilerOptions": {
        "outDir": "./dist/",
        "noImplicitAny": true,
        "module": "es6",
        "target": "es5",
        "jsx": "react",
        "allowJs": true
    }
}
`;

/**
 * 遍历创建文件
 * @param {string} dest 相对路径 + 文件名
 * @param {string} temp 文件模板
 */


const confList = [
  { // 通过选项创建 html 或 pug 文件
    dest: `./${store.dirname}/src/index.html`,
    temp: htmlTemp,
  },
  { // 创建package.json文件
    dest: `./${store.dirname}/package.json`,
    temp: packageTemp,
  }
];

module.exports = function appendFiles () {
  confList.forEach(item => {
    fs.appendFileSync(
      item.dest,
      item.temp,
      {
        flag: 'w'
      }
    );
  });
  // fs.rename(`./${store.dirname}/src/index.css`, `./${store.dirname}/src/index.${store.options.precss || 'css'}`);
};
