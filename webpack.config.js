const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  mode: 'production',
  output: {
    filename: 'popup.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: 'app/static', to: path.resolve('dist') },
        { from: 'app/soundFiles', to: 'soundFiles' },
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
              '@babel/preset-env', {
                modules: false,
                loose: true
                }
              ],
              '@babel/preset-react'
            ],
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.js']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};

if (process.env.NODE_ENV != 'production') { 
  config.watch = true; 

  const shell = new WebpackShellPluginNext({
    onBuildStart:{
      scripts: [],
      blocking: true,
      parallel: false
    }, 
    onBuildEnd:{
      scripts: [
        "[ \"$(uname)\" == \"Darwin\" ] && bash -c 'open -a \"Google Chrome\" http://reload.extensions'"
      ],
      blocking: true,
      parallel: false
    }
  })
  
  config.plugins.push(shell);
}

module.exports = config;