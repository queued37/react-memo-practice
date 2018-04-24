const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [htmlPlugin]
}
