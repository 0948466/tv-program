const path = require('path');

module.exports = {
  configureWebpack: () => ({
    module: {
      rules: [
        {
          test: /\.(pdf)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'documents/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(svg)(\?.*)?$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'img/[name].[hash:8].[ext]',
                  },
                },
              },
            },
          ],
        },
      ],
    },
  }),

  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .test(() => false)
      .use('file-loader');
  },

  css: {
    loaderOptions: {
      // передача настроек в sass-loader
      sass: {
        // @/ это псевдоним к каталогу src/ поэтому предполагается,
        // что у вас в проекте есть файл `src/variables.scss`
        data: '@import "@/scss/base/variables.scss"; @import "@/scss/mixins/elements.scss";',
      },
    },
  },

  lintOnSave: true,
  outputDir: path.resolve(__dirname, './build'),
  assetsDir: 'packs/',

};
