const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DisableOutputWebpackPlugin = require('./disable-output-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: [path.resolve(__dirname, 'textbus/assets/component-library.plugin.scss'),path.resolve(__dirname, 'textbus/assets/outlines.scss')]//, path.resolve(__dirname, 'textbus/plugin/outlines-plugin/outline.css')
  },
  output: {
    path: path.resolve(__dirname, 'bundles/')
  },
  
  module: {
    rules: [{
      test: /\.ts$/,
      use: ['ts-loader']
    }, {
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
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'textbusLib-0.73.4.min.css'
    }),
    new DisableOutputWebpackPlugin(/textbus/)
  ]
}
//, {
//  test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
//  type: 'asset/inline'
//}