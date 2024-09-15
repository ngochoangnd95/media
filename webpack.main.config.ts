import path from 'path';
import type { Configuration } from 'webpack';
import { plugins } from './webpack.plugins';
import { rules } from './webpack.rules';

const CopyPlugin = require('copy-webpack-plugin');
const PermissionsPlugin = require('webpack-permissions-plugin');

plugins.push(
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'node_modules/ffmpeg-static/ffmpeg'),
        to: './',
      },
    ],
  }),
  new PermissionsPlugin({
    buildFiles: [
      {
        path: path.resolve(__dirname, '.webpack/main/ffmpeg'),
        fileMode: '755',
      },
      {
        path: path.resolve(__dirname, '.webpack/main/native_modules/ffprobe'),
        fileMode: '755',
      },
    ],
  }),
);

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  externals: {
    ffmpeg: 'commonjs2 ffmpeg-static',
  },
};
