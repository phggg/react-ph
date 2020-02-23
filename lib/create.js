// 初始化创建步骤选项列表
const { inquirerList, inquirerPrecssList, options, dependencies } = require('./store');
const inquirer = require('inquirer');
const store = require('./store');

module.exports = async function () {
  const answersStep = [];
  const submenu = ['precss'];
  await inquirerPro()
  await inquirerBase(answersStep, submenu);
  await hasPrecss(answersStep);
  require('./creator')();
};

async function inquirerPro () {
  await inquirer.prompt([
    {
      name: 'name',
      message: '项目的名称',
      default: store.dirname
    }, {
      name: 'version',
      message: '项目的版本号',
      default: '1.0.0'
    }, {
      name: 'description',
      message: '项目的简介',
      default: `A react project`
    }, {
      name: 'author',
      message: '请输入作者名称',
      default: 'react'
    }
  ]).then((answers) => {
    store.pro = answers
  }).catch(err => {
    return Promise.reject(err)
  })
}

// 一级菜单 基本选项
function inquirerBase (answersStep, submenu) {
  return new Promise(resolve => {
    const inquirerOptions = inquirer.createPromptModule();
    inquirerOptions(inquirerList).then(answers => {
      submenu.forEach(item => {
        if (answers.options.includes(item)) answersStep.push(item);
      });
      console.log(answersStep);
      answers.options.forEach(item => {
        if (store.options[item] === false) store.options[item] = true;
        if (!answersStep.includes(item) && item in dependencies) {
          options.dependencies = [...options.dependencies, ...dependencies[item]];
        }
      });
      resolve();
    });
  });
}
// 二级子菜单 css 预处理器
function hasPrecss (answersStep) {
  return new Promise((resolve, reject) => {
    if (answersStep.includes('precss')) {
      const inquirerPrecss = inquirer.createPromptModule();
      inquirerPrecss(inquirerPrecssList).then(answers => {
        console.log(answers);
        store.cssLoader = answers.Precss
        store.options.precss = answers.Precss || 'stylus';
        options.dependencies = [...options.dependencies, ...dependencies[answers.Precss]];
        resolve();
      });
    } else {
      resolve();
    }
  });
}
