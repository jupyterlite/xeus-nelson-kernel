const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/xnelson_wasm.wasm',
          to: '.'
        },
        {
          from: 'src/xnelson_wasm.js',
          to: '.'
        }
      ]
    })
  ]
};
