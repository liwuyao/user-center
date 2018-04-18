module.exports = {
  proxy: {
        '/api': {    //将www.exaple.com印射为/apis
            target: 'http://101.132.43.250:20003',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite的,
            }              
        }
  }
}