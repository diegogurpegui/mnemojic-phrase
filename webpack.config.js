const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [path.resolve(__dirname, 'src/index.js'), path.resolve(__dirname, 'src/mnemojicProcessor.js')],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: '[name].[contenthash:8].js',
    // filename: 'js/bundle.js',
  },
  module: {
    rules: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //     },
    //   },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins() {
                // postcss plugins, can be exported to postcss.config.js
                return [require('autoprefixer')];
              },
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['web'],
    }),
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: 'src/public' }],
    // }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'web'),
    compress: true,
    port: 9000,
  },
};
