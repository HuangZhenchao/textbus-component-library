module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:5382',     //接口RestMapper(地址),或者你要写的模块的根地址
                changeOrigin: true,              //是否设置同源
                pathRewrite: {                   //路径重写
                    '^/api': '/api'                     //选择忽略拦截器里面的单词
                }
            }
        }
    }
}