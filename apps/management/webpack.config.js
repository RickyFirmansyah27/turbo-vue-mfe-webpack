const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/management/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'management',
      filename: 'remoteEntry.js',
      exposes: {
        './Dashboard': './src/views/Dashboard.vue',
        './Departments': './src/views/Departments.vue',
        './Employees': './src/views/Employees.vue',
        './Reports': './src/views/Reports.vue',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^2.6.11',
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '^3.2.0',
        },
        vuex: {
          singleton: true,
          requiredVersion: '^3.4.0',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      'commons': path.resolve(__dirname, '../common/src')
    },
    extensions: ['.js', '.vue', '.json']
  },
  devServer: {
    port: 8083,
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  }
};