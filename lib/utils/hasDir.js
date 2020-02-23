const fs = require('fs');
const chalk = require('chalk');
const logSymbols = require('log-symbols')
const path = require('path')
const glob = require('glob')

module.exports = function (projectName) {
  return new Promise((resolve, reject) => {
    const list = glob.sync('*')
    let rootName = path.basename(process.cwd())
    let next = undefined
    if (list.length) {  // 如果当前目录不为空
      if (list.some(name => {
        const fileName = path.resolve(process.cwd(), name)
        const isDir = fs.statSync(fileName).isDirectory()
        return name === projectName && isDir
      })) {
        console.log(logSymbols.error, chalk.red(`项目${projectName}已经存在,请您更改项目名称后再试`))
        return
      }
      resolve(projectName)
    } else if (rootName === projectName) {
      next = inquirer.prompt([
        {
          name: 'buildInCurrent',
          message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
          type: 'confirm',
          default: true
        }
      ]).then(answer => {
        resolve(answer.buildInCurrent ? '.' : projectName)
      })
    } else {
      // rootName = projectName
      resolve(projectName)
    }
  });
};