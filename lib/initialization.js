#!/usr/bin/env node
// 初始化基本命令及参数

const hasDir = require('./utils/hasDir');
const store = require('./store');
const { checkPackageVersion } = require('./utils/check');
const requiredNodeVersion = require('../package.json').engines.node;
const program = require('commander');
const glob = require('glob')
const requiredPackageVersion = require('../package.json').version;
const clearConsole = require('./utils/clearConsole');
const { checkNodeVersion } = require('./utils/check');

// 判断是否初始化快速创建项目
function isQuickCreact (cmd) {
  if (cmd.quick) {
    require('./creator')();
  } else {
    require('./create')();
  }
}

// 初始化命令
function programConfig () {
  program.version(requiredPackageVersion)
    .usage('<command> [options]');

  // 配置 项目创建指令
  program.command('create <app-name>')
    .description('create a new project powered by react-ph')
    .option('-n, noversion', `Prohibited Version Detection`)
    .option('-q, quick', 'Quick Initialization Project')
    .action(async (name, cmd) => {
      // 判断是否存在创建的目录
      store.root = name
      name = await hasDir(name);
      store.cmd = 'create';
      store.dirname = name;
      // 清空控制台，并输出当前版本
      clearConsole('cyan', `react-ph v${requiredPackageVersion}`);
      // 判断参数 是否避免版本检测
      if (cmd.noversion) {
        isQuickCreact(cmd);
      } else {
        // console.log(store)
        // 检测版本（通过 npm 获取 latest 版本号）
        // await checkPackageVersion(store.npmVersionUrl);
        isQuickCreact(cmd);
      }
    });

  // 测试
  program.command('test <name>')
    .description('react-ph in travis-ci test')
    .option('-a, test1', 'test babel && eslint')
    .option('-b, test2', 'test pug')
    .option('-c, test3', 'test rem layout')
    .option('-d, test4', 'test precss sass')
    .option('-e, test5', 'test precss less')
    .option('-f, test6', 'test precss stylus')
    .action((name, cmd) => {
      store.cmd = 'test';
      switch (name) {
        case 'bs':
          store.options.eslint = true;
          store.options.babel = true;
          store.options.dependencies = [...store.options.dependencies, ...store.dependencies.eslint];
          store.options.dependencies = [...store.options.dependencies, ...store.dependencies.babel];
          break;
        case 'sass':
          store.options.precss = 'scss';
          store.options.dependencies = [...store.options.dependencies, ...store.dependencies.scss];
          break;
        case 'less':
          store.options.precss = 'less';
          store.options.dependencies = [...store.options.dependencies, ...store.dependencies.less];
          break;
        case 'stylus':
          store.options.precss = 'styl';
          store.options.dependencies = [...store.options.dependencies, ...store.dependencies.styl];
          break;
        default:
          break;
      }
      require('./creator')();
    });

  // 执行
  program.parse(process.argv);
}

module.exports = function initialization () {
  // 检测 node 版本
  checkNodeVersion(requiredNodeVersion, 'react-ph');
  // commander 配置
  programConfig();
};
