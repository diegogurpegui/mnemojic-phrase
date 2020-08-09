const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['./src/utils.js'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'js/bundle.js',
  },
};
