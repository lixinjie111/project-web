const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  lintOnSave: true,
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //     .set('@assets',resolve('src/assets'))
  //     .set('@components', resolve('src/components'))
  // },
  publicPath: '/',
  //声明配置webpack
  configureWebpack: {
    resolve: {
      //配置路径别名
      alias: {
        'src': '@/src',
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views'
      }
    }
  },
  // proxy: {
  //   '/': {
  //     target: '', // 目标代理接口地址
  //     secure: false,
  //     changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
  //     pathRewrite: {
  //       '^/': '/'
  //     }
  //   }
  // }
};