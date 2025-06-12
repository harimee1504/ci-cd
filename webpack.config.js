const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const { merge } = require('webpack-merge');

module.exports = (config) => {
  return merge(config, {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        }
      ]
    }
  });
};
