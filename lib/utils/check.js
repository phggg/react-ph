const semver = require('semver');
const chalk = require('chalk');
const request = require('request');
const requiredVersion = require('../../package.json').version;
const Ora = require('ora');
const spinner = new Ora();

/**
 * 检测 Node 版本
 * @param {string} wanted 期望版本号
 * @param {string} id 项目名（react-ph）
 */
function checkNodeVersion (wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ));
    process.exit(1);
  }
  // 提示未来不再支持 node 9.x 版本
  if (semver.satisfies(process.version, '9.x')) {
    console.log(chalk.yellow(
      `You are using Node ${process.version}.\n` +
      `Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\n` +
      `It's strongly recommended to use an active LTS version instead.`
    ));
  }
}

/**
 * 通过 npm 检测是否更新包
 * @param {string} url npm包路径
 * @returns {Promise}
 */
function checkPackageVersion (url) {
  return new Promise((resolve, reject) => {
    spinner.start('Checking react-ph version');
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let version = JSON.parse(body).version;
        if (semver.lte(version, requiredVersion)) {
          spinner.stop();
          resolve();
        } else {
          spinner.stop();
          console.log(chalk.red(
            `You are using react-ph v${requiredVersion}, But the latest version is v${version}.\nPlease upgrade your react-ph version. \n\n>> npm update react-ph -g`
          ));
          process.exit(1);
        }
      } else {
        spinner.clear();
        console.log(chalk.red(
          'Failed to obtain version information through NPM!'
        ));
        reject(error);
        process.exit(1);
      }
    });
  });
}

module.exports = {
  checkNodeVersion,
  checkPackageVersion
};