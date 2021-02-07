/** @format */

import path from "path";
import fs from "fs";
import paths, { moduleFileExtensions } from "./config/paths";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import packagejson from "./package.json";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const config: webpack.Configuration = {
  target: "web",
  entry: "./src/index.tsx",
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: any) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `gitir.${packageName.replace("@", "")}`;
          }
        }
      }
    }
    // Keep the runtime chunk separated to enable long term caching
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript"
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-we"]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"]
      },
      {
        test: [/\.avif$/],
        loader: "url-loader",
        options: {
          limit: "1000",
          mimetype: "image/avif",
          name: "static/media/[name].[ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: `gitir todo`,
      template: "public/index.html"
    }),
    new ForkTsCheckerWebpackPlugin({ async: true }),
    new webpack.container.ModuleFederationPlugin({
      name: "todo",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": {
          singleton: true
        }
      }
    })
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "static",
    // }),
  ],
  resolve: {
    alias: {
      components: paths.appComponents,
      assets: paths.appAssets,
      pages: paths.appPages,
      hooks: paths.appHooks,
      state: paths.appState,
      api: paths.appApi,
      types: paths.appTypes,
      utils: paths.appUtils
    },
    // modules: ["node_modules", paths.appNodeModules],
    extensions: moduleFileExtensions.map((ext) => `.${ext}`)
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "static/js/[name].[contenthash:8].js",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 3001,
    historyApiFallback: true
  }
};

export default config;
