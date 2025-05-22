const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index.js", // Ensure this matches your entry file
  output: {
    filename: "main.js", // Change the name to index.js or any name you prefer
    publicPath: "http://localhost:5010/", // Your public path for assets
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 5010,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        shell: "shell@http://localhost:5000/remoteEntry.js",
        video: "video@http://localhost:5001/remoteEntry.js",
        channel: "channel@http://localhost:5002/remoteEntry.js",
        home: "home@http://localhost:5003/remoteEntry.js",
        wires: "wires@http://localhost:5004/remoteEntry.js",
        upload: "upload@http://localhost:5005/remoteEntry.js",
        subscription: "subscription@http://localhost:5006/remoteEntry.js",
        shared: "shared@http://localhost:5007/remoteEntry.js",
        settings: "settings@http://localhost:5008/remoteEntry.js",
        clipz: "clipz@http://localhost:5009/remoteEntry.js",
        user: "user@http://localhost:5010/remoteEntry.js",
      },
      exposes: {
        "./Hello": "./src/components/Hello.jsx",
        // "./Header": "./src/Header.jsx",
        // "./Footer": "./src/Footer.jsx",
        // "./products": "./src/products.js",
        // "./HomeContent": "./src/HomeContent.jsx",
        // "./MainLayout": "./src/MainLayout.jsx",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: false,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: false,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html", // Make sure it's pointing to the correct HTML template
    }),
  ],
};
