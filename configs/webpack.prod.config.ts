import { type Configuration, ProgressPlugin } from 'webpack';
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
  plugins: [new ProgressPlugin()],
};

export default merge(config, baseConfig);
