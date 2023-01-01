import type { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.base.config';

const config: Configuration = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
      }),
    ],
  },
  plugins: [new WebpackBar()],
};

export default merge(config, baseConfig);
