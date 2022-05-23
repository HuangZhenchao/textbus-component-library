const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DisableOutputWebpackPlugin = require('./disable-output-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: [
      path.resolve(__dirname, 'textbus/assets/index.scss')
    ]
    //, path.resolve(__dirname, 'textbus/plugin/outlines-plugin/outline.css')
  },
  output: {
    path: path.resolve(__dirname, './bundles/')
  },
  
  module: {
    rules: [
      /*
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,        
        use: [{
          loader:'url-loader',
          options: {
            limit:130000,
            encoding:"base64",
            //name: './bundles/fonts/[name].[ext]',
            fallback:require.resolve("file-loader")
            //outputPath: '',
            //esModule:false
          }
        }]
      }, */
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,        
        use: [{
          loader:'file-loader',
          options: {
            name: './fonts/[name].[ext]',
            //fallback:require.resolve("file-loader")
            //outputPath: 'bundles/',
            //esModule:false
          }
        }]
      }, 
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    // Options
                  },
                ],
                [
                  "autoprefixer"
                ]
              ],
            }
          }
        }, 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'textbusLib-0.beta.2.1.min.css'
    }),
    //new DisableOutputWebpackPlugin(/textbus/)
  ]
}
