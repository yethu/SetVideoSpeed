const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: `${__dirname}/app`,
  mode: 'production',
  entry: {
    popup: ['./constants.js', './contracts.js', './popup.js'],
    background: './background.js',
    content: './content.js',
  },
  output: {
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '*.+(html|json)',
        flatten: true,
      },
      {
        from: 'images',
        to: './images',
      },
      {
        from: 'styles',
        to: './styles',
      },
    ]),
  ],
};
