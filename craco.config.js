const CracoAlias = require('craco-alias');

module.exports = function({ env }) {
  return {
    plugins: [
      {
        plugin: CracoAlias,
        options: {
          baseUrl: './src',
          aliases: {
            '@services': './services',
            '@components': './components',
            '@screens': './screens',
            '@utils': './utils',
            '@constants': './constants'
          }
        }
      }
    ]
  }
}
