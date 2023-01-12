import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import WebpackBar from 'webpackbar';

import baseConfig from './webpack.base.config';

const config: Configuration = {
  mode: 'production',
  stats: 'errors-warnings',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new WebpackBar({
      color: '#504ebc',
    }),
  ],
};

export default merge(config, baseConfig);
