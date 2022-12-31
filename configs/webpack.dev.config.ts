import type { Configuration } from 'webpack';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import { merge } from 'webpack-merge';
import 'webpack-dev-server';

import baseConfig from './webpack.base.config';
import path from 'path';

const config: Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    compress: true,
    port: 2333,
    open: true,
    historyApiFallback: true,
  },
  plugins: [new ForkTsCheckerPlugin()],
};

export default merge(config, baseConfig);
