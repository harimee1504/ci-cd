const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { merge } = require('webpack-merge');

const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = (config) => {
  return merge(config, {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        "crypto": "crypto-browserify",
        "path": "path-browserify"
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  jsx: 'react'
                }
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new NextFederationPlugin({
        name: 'angular-host',
        remotes: {
          auth: 'auth@https://auth-layout.vercel.app/_next/static/chunks/remoteEntry.js'
        },
        shared: ["react", "react-dom", "react-router-dom", "@clerk/clerk-react"]
      })
    ]
  });
};
