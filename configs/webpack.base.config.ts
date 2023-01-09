import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin, ProvidePlugin } from 'webpack';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AutoImport from 'unplugin-auto-import/webpack';
import Components from 'unplugin-vue-components/webpack';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'production' ? undefined : `.env.${process.env.NODE_ENV}`,
});

const isDevMode = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/main.ts'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              ignoreDiagnostics: isDevMode ? [] : [7006, 2322, 2769, 2345, 7031],
            },
          },
        ],
      },
      {
        test: [/\.scss$/i, /\.css$/],
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
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@use '@styles/var.scss' as *;`,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.vue', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'App Tracker For Iconpack',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
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
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../src/sw.ts'),
      swDest: 'sw.js',
    }),
    new ProvidePlugin({
      process: 'process/browser.js',
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
};

export default config;
