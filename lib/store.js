// 所有配置信息项

module.exports = {
  // 创建目录名
  dirname: '',
  cmd: '',
  pro: {},
  cssLoader: '',
  // npm 版本 url
  npmVersionUrl: 'https://registry.npmjs.org/react-ph/latest',
  // 选项
  options: {
    babel: false,
    typescript: false,
    // css 预处理器
    precss: 'css',
    answers: [],
    dependencies: [
      {
        name: 'postcss-loader',
        version: '3.0.0'
      },
      {
        name: 'add-asset-html-webpack-plugin',
        version: '3.1.3'
      },
      {
        name: 'postcss-preset-env',
        version: '6.7.0'
      },
      {
        name: 'css-loader',
        version: '2.1.1'
      },
      {
        name: 'style-loader',
        version: '1.1.2'
      },
      {
        name: 'file-loader',
        version: '5.0.2'
      },
      {
        name: 'autoprefixer',
        version: '9.7.3'
      },
      {
        name: 'url-loader',
        version: '3.0.0'
      },
      {
        name: 'html-loader',
        version: '0.5.5'
      },
      {
        name: 'html-webpack-plugin',
        version: '3.2.0'
      },
      {
        name: 'mini-css-extract-plugin',
        version: '0.7.0'
      },
      {
        name: 'webpack',
        version: '4.41.5'
      },
      {
        name: 'webpack-cli',
        version: '3.3.10'
      },
      {
        name: 'webpack-dev-server',
        version: '3.10.1'
      },
      {
        name: 'core-js',
        version: '3.6.4'
      },
      {
        name: '@babel/preset-react',
        version: '7.8.3'
      },
      {
        name: 'react',
        version: '16.12.0'
      },
      {
        name: 'react-dom',
        version: '16.12.0'
      },
      {
        name: 'webpack-dev-middleware',
        version: '3.7.2'
      },
      {
        name: 'webpack-merge',
        version: '4.2.2'
      },
      {
        name: 'clean-webpack-plugin',
        version: '3.0.0'
      },
      {
        name: 'mini-css-extract-plugin',
        version: '0.9.0'
      },
      {
        name: 'html-webpack-plugin',
        version: '3.2.0'
      },
      {
        name: 'optimize-css-assets-webpack-plugin',
        version: '5.0.3'
      },
      {
        name: 'postcss-import',
        version: '12.0.1'
      },
      {
        name: 'cross-env',
        version: '6.0.3'
      },
    ],
  },
  // 选项列表
  inquirerList: {
    name: 'options',
    type: 'checkbox',
    message: '请选择你需要安装的模块',
    choices: [
      {
        name: 'Babel',
        value: 'babel',
        checked: true
      },
      {
        name: 'CSS Pre-processors',
        value: 'precss'
      },
      {
        name: 'react-router-dom',
        value: 'router'
      },
    ]
  },
  inquirerPrecssList: {
    name: 'Precss',
    type: 'list',
    message: '请选择你需要安装的样式模块',
    choices: [
      {
        name: 'Sass',
        value: 'sass',
      },
      {
        name: 'Less',
        value: 'less',
      },
      {
        name: 'Stylus',
        value: 'stylus',
      },
    ]
  },
  // 预设依赖及版本信息
  dependencies: {
    babel: [
      {
        name: '@babel/runtime',
        version: '7.8.3'
      },
      {
        name: '@babel/plugin-transform-runtime',
        version: '7.8.3'
      },
      {
        name: '@babel/core',
        version: '7.8.3'
      },
      {
        name: '@babel/preset-env',
        version: '7.8.3'
      },
      {
        name: 'babel-loader',
        version: '8.0.6'
      },
      {
        name: '@babel/runtime-corejs3',
        version: '7.8.3'
      },
      {
        name: '@babel/polyfill',
        version: '7.8.3'
      },
      {
        name: '@babel/plugin-syntax-dynamic-import',
        version: '7.8.3'
      },
      {
        name: '@babel/plugin-proposal-decorators',
        version: '7.8.3'
      },
      {
        name: '@babel/plugin-proposal-class-properties',
        version: '7.8.3'
      },
    ],
    router: [
      {
        name: 'react-router-dom',
        version: '5.1.2'
      },
    ],
    sass: [
      {
        name: 'node-sass',
        version: '4.12.0'
      },
      {
        name: 'sass-loader',
        version: '7.1.0'
      },
    ],
    less: [
      {
        name: 'less-loader',
        version: '5.0.0'
      },
      {
        name: 'less',
        version: '3.9.0'
      },
    ],
    stylus: [
      {
        name: 'stylus-loader',
        version: '3.0.2'
      },
      {
        name: 'stylus',
        version: '0.54.5'
      },
    ],
  },
};