module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9090,
    https: false,
    hotOnly: false,
    proxy: {
      '/mip': { //MIP后台接口
        target: 'http://mipdev9.midea.com:60000',
        secure: false
      },
    }, // string | Object
    before: app => {
      // app is an express instance
    }
  }
}