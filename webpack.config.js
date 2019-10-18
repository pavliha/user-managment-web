const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const Clean = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const analyze = process.argv.find(a => a === '--analyze')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
    alias: {
      src: path.resolve(__dirname, './src'),
      api: path.resolve(__dirname, './src/api'),
      assets: path.resolve(__dirname, './src/assets'),
      constants: path.resolve(__dirname, './src/constants'),
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      services: path.resolve(__dirname, './src/services'),
      config: path.resolve(__dirname, './src/config'),
      shapes: path.resolve(__dirname, './src/shapes'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },

  entry: {
    client: path.resolve(__dirname, 'src/index.jsx'),
  },

  context: __dirname,

  performance: {
    maxEntrypointSize: 500000,
    hints: false,
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({ cache: true, parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: `[name].[hash:3].js`,
  },

  target: 'web',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [{ loader: 'file-loader', options: { name: '[path][name].[ext]' } }],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'react-icon-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } }],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },

  plugins: [
    ...(analyze ? [new BundleAnalyzerPlugin()] : []),
    new Dotenv(),
    new Clean('./dist', { root: path.resolve(__dirname, './') }),
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en|ru|ua)$/),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css', chunkFilename: '[id].[contenthash].css' }),
    new CopyWebpackPlugin([{ from: 'src/assets', to: './' }]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        // collapseWhitespace: true,
      },
      inject: true,
    }),
  ],
}
