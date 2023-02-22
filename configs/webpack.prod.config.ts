import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import WebpackBar from 'webpackbar';

import baseConfig from './webpack.base.config';
import path from 'path';

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
    splitChunks: {
      chunks: 'async',
      minSize: 0.2 * 1024 * 1024,
      maxSize: 0.5 * 1024 * 1024,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendor-[chunkhash].js',
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 0.5 * 1024 * 1024,
    maxAssetSize: 1 * 1024 * 1024,
    assetFilter: (assetFilename: string) => {
      return assetFilename.endsWith('.js');
    },
  },
  plugins: [
    new WebpackBar({
      color: '#504ebc',
    }),
  ],
};

export default merge(config, baseConfig);
