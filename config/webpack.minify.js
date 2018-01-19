const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
      filename: './bin/html_js_mini/code.js'
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
        filename: './bin/html_js_mini/index.html'
      }),
      new WebpackShellPlugin({
        onBuildExit:
        [
            'node node_modules/.bin/uglifyjs --compress --mangle --output ./bin/html_js_mini/code.js -- ./bin/html_js_mini/code.js &&' +
            'html-inline -i ./bin/html_js_mini/index.html -o ./bin/html_mini/index.html -b ./bin/html_js_mini'
        ],
        safe: true
      })
    ]
  };