/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const ENV_PROD = "production";
const ENV_DEV = "development";

const mode = process.env.NODE_ENV || ENV_DEV;
const port = process.env.PORT || 3000;

module.exports = {
  mode,
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    hot: true,
    port,
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          process.env.NODE_ENV === ENV_PROD
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
			Build Date: ${new Date().toLocaleString()}
			Environment: ${process.env.NODE_ENV}
			`,
    }),
    new webpack.CleanPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify:
        process.env.NODE_ENV === ENV_PROD
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      hash: process.env.NODE_ENV === ENV_PROD,
    }),
    ...(process.env.NODE_ENV === ENV_PROD ? [new MiniCssExtractPlugin()] : []),
  ],
  optimization: {
    minimizer:
      mode === ENV_PROD
        ? [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ]
        : [],
  },
};
