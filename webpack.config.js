const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    popup: ['./app/constants.js', './app/contracts.js', './app/popup.js'],
    background: './app/background.js',
    content: './app/content.js',
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './app/*.html',
        flatten: true,
      },
      {
        from: './app/*.json',
        flatten: true,
      },
      {
        from: './app/images',
        to: './images',
      },
      {
        from: './app/styles',
        to: './styles',
      },
    ]),
  ],
};
