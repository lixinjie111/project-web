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
  devServer: {
    // proxy:"https://dev-teamapi.yzmetax.com", //开发环境的跨域问题解决，后端springboot服务ip 和 端口
    // port: 8080
      proxy: {
      '/api': {
        target: 'https://dev-teamapi.yzmetax.com', // 目标代理接口地址
        ws: true,
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/' : ''
        }
      }
    }
  }
};