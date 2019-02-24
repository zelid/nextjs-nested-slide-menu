const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin
const withSass = require('@zeit/next-sass')
const withFonts = require('next-fonts')

module.exports = withTypescript(
  withFonts(
      withCSS(
          withSass({
            useTsPathsAsAlias: true,
            cssLoaderOptions: {
              importLoaders: 1,
              localIdentName: "[local]_[hash:base64:5]"
            },
            webpack(config, options) {
              // adds support of '@f/*', '~/*' paths:
              config.resolve.plugins = [
                ...(config.resolve.plugins || []),
                new TsConfigPathsPlugin()
              ]
              return config
            }
          })
        )
    )
)
