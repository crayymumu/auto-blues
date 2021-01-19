// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '自由口琴 - AutoHarmonica | 在线吹口琴，听简谱演绎 - Play Harmonica Online';
        return args;
      })
  },
  devServer: {
    // host: 'localhost',
    /* 本地ip地址 */
    port: '8080',
    hot: true,
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    /* 跨域代理 */
    // proxy: {}
  }
};
