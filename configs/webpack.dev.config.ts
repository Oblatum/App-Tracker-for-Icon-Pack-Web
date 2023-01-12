import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

import 'webpack-dev-server';
import baseConfig from './webpack.base.config';

const config: Configuration = {
  mode: 'development',
  stats: 'errors-warnings',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    port: 2333,
    open: true,
    historyApiFallback: true,
  },
  plugins: [new ForkTsCheckerPlugin()],
};

export default merge(config, baseConfig);
