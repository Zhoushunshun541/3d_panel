const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css', 'svg', 'eot', 'ttf'];
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理 babel 编译
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'index.html',
      filename: 'index.html',
      title: '营业部面板',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      file:
        process.env.NODE_ENV === 'production'
          ? {
              css: [],
              js: [
                'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
                'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
                'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
                'https://cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js',
              ],
            }
          : {},
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    externals:
      process.env.NODE_ENV === 'production'
        ? {
            vue: 'Vue',
            vuex: 'Vuex',
            axios: 'axios',
            'vue-router': 'VueRouter',
          }
        : {},
    devtool:
      process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        src: '@',
      },
    },
    plugins: [
      // 压缩插件
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
  chainWebpack: config => {
    config.module.rule('eslint').exclude.end();
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index').delete('preload-index');
  },
  css: {
    requireModuleExtension: true,
    extract: process.env.NODE_ENV === 'production',
    sourceMap: process.env.NODE_ENV !== 'production',
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[local]_[hash:base64:8]',
        },
      },
    },
  },
  devServer: {
    open: true,
    // host: 'localhost',
    port: 9876,
    https: false,
    hot: false,
    hotOnly: false,
    compress: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
