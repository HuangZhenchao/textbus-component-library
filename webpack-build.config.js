const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'textbus/_public-api.ts')
  },
  output: {
    path: path.resolve(__dirname, './bundles'),
    filename: 'textbusLib-0.beta.2.1.min.js',
    libraryTarget: 'umd',
    library: 'textbusLib',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ['ts-loader']
    }]
  }
};