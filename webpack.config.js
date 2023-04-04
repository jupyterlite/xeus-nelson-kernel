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
        },
        //{
        //  from: 'src/nelson_data.js',
        //  to: '.'
        //},
        //{
        //  from: 'src/*.data',
        //  to: './[name].data'
        //},
        {
          from: 'src/*.js',
          to: './[name].js'
        }
      ]
    })
  ]
};
