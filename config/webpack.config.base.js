// 配置 webpack以支持es6语法
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const nodeExcternals = require("webpack-node-externals"); // 排除无用模块
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackconfig = {
  target: "node",
  entry: {
    server: path.join(utils.APP_PATH, "index.js")
  },
  output: {
    filename: "[name].bundle.js",
    path: utils.DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: [path.join(__dirname, "/node_modules")]
      }
    ]
  },
  externals: [nodeExcternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // 在webpack打包时，创建一个全局的常量
      "process.env": {
        NODE_ENV:
          process.env.NODE_ENV === "production" ||
          process.env.NODE_ENV === "prod"
            ? "production"
            : "development"
      }
    })
  ],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  }
};

module.exports = webpackconfig;
