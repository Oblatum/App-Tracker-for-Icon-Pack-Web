import path from 'path';
import { Configuration, ProvidePlugin, DefinePlugin } from 'webpack';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const isDevMode = process.env.NODE_ENV !== 'production';

const envConfig = dotenv.config({
  path: isDevMode ? `.env.${process.env.NODE_ENV}` : '.env',
});

dotenvExpand.expand(envConfig);

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/main.ts'),
  output: {
    filename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    clean: true,
    hashDigestLength: 16,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: !isDevMode,
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[hash:base64:8]-[path]-[name]-[local]',
              },
              sourceMap: isDevMode,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(txt|md)$/i,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.vue', '.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      title: 'App Tracker For Iconpack',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new ProvidePlugin({
      process: 'process/browser.js',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          globOptions: {
            ignore: [path.resolve(__dirname, '../public/index.html')],
          },
        },
      ],
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
};

export default config;
