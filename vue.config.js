const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
    configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([
				{
					from: 'node_modules/cesium/Build/Cesium/Workers',
					to: 'cesium/Workers'
				}
			]),
			new CopyWebpackPlugin([
				{
					from: 'node_modules/cesium/Build/Cesium/ThirdParty',
					to: 'cesium/ThirdParty'
				}
			]),
			new CopyWebpackPlugin([
				{ from: 'node_modules/cesium/Build/Cesium/Assets', to: 'cesium/Assets' }
			]),
			new CopyWebpackPlugin([
				{
					from: 'node_modules/cesium/Build/Cesium/Widgets',
					to: 'cesium/Widgets'
				}
			]),
			new webpack.DefinePlugin({
				// Define relative base path in cesium for loading assets
				CESIUM_BASE_URL: JSON.stringify('./cesium')
			})
		],
		module: {
			unknownContextCritical: false
		}
	},
    devServer: {
		host:'0.0.0.0',
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