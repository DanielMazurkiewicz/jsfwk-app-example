const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
      filename: './bin/html_js/code.js'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '',
        inject: 'body',
        filename: './bin/html_js/index.html'
      }),
      new WebpackShellPlugin({onBuildEnd:
        ['html-inline -i ./bin/html_js/index.html -o ./bin/html/index.html -b ./bin/html_js']
      })
    ]
  };