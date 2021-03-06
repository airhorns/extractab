const { environment } = require('@rails/webpacker')
const typescript = require('./loaders/typescript')
const path = require('path')

environment.loaders.append('typescript', typescript)
environment.loaders.append('ohm', {
  test: /\.ohm$/,
  use: [
    {
      loader: path.resolve('config/webpack/loaders/ohm_loader.js'),
    }
  ]
})

module.exports = environment
