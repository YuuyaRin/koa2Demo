const webpackMerge = require("webpack-merge");

const baseWebpackConfig = require("./webpack.config.base");

const TerserWebpackPlugin = require("terser-webpack-plugin"); // 压缩js

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: "production",
  stats: { children: false, warnings: false },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            // 是否注释掉console
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          output: {
            // 输出：不要注释，一行输出
            comments: false,
            beautify: false
          },
          mangle: true
        },
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      // 公用代码拆分
      cacheGroups: {
        commons: {
          name: "commonts",
          chunks: "initial",
          minChunks: 3,
          enforce: true
        }
      }
    }
  }
});

module.exports = webpackConfig;
