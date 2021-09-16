const { resolve } = require('path');
const mockServer = require('@bwrong/mock');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const pkg = require('./package');
const { VUE_APP_API_HOST, VUE_APP_API_TITLE, VUE_APP_API_PREFIX } = process.env;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_MOCK = process.env.NODE_ENV === 'mock';
const productionGzipExtensions = ['js', 'css', 'html', 'svg'];
const ENABLE_CDN = false; // 开启cdn
// cdn配置
const assetsCDN = {
  // 需要cdn的资源需要在此处添加，并且和开发时安装的对应包版本必须一致
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    nprogress: 'NProgress',
    'js-cookie': 'Cookies'
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@3.0.11/dist/vue.runtime.global.prod.js',
    '//cdn.jsdelivr.net/npm/vue-router@4.0.6/dist/vue-router.global.prod.js',
    '//cdn.jsdelivr.net/npm/vuex@4.0.0/dist/vuex.global.prod.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    '//cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js'
  ]
};
module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 8080,
    before(app) {
      // 数据mock
      IS_MOCK &&
        mockServer(app, resolve('./mock/'), {
          prefix: VUE_APP_API_PREFIX,
          delay: 500
        });
    },
    proxy: {
      [VUE_APP_API_PREFIX]: {
        target: VUE_APP_API_HOST,
        // secure: false,
        // ws: true,
        changeOrigin: false, // 将Origin的来源更改为目标URL
        pathRewrite: {
          [`^${VUE_APP_API_PREFIX}`]: '/api' // 需要rewrite的,即真实的服务器地址中是否包含VUE_APP_API_PREFIX
        }
      }
    }
  },
  configureWebpack: (config) => {
    config.plugins.push(
      // dayjs替换moment
      new AntdDayjsWebpackPlugin({ preset: 'antdv3' })
    );
    if (IS_PRODUCTION) {
      config.plugins.push(
        // gzip
        new CompressionWebpackPlugin({
          // 开启gzip压缩
          filename: '[file].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          compressionOptions: { level: 1 }
        })
      );
      // cdn
      ENABLE_CDN && (config.externals = assetsCDN.externals);
    }
  },
  chainWebpack: (config) => {
    // 添加文件路径别名
    config.resolve.alias.set('components', resolve('src/components'));
    // 优化js压缩
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true;
      args[0].terserOptions.compress.drop_debugger = true;
      return args;
    });

    // 限制fork-ts-checker插件内存, 防止占用较高
    config.plugin('fork-ts-checker').tap((args) => {
      args[0].typescript.memoryLimit = 1024;
      return args;
    });
    config.plugin('html').tap((args) => {
      // 修改title
      args[0].title = VUE_APP_API_TITLE;
      if (IS_PRODUCTION) {
        // 注入版本信息
        let appVersion = `app-version=${pkg.version},build-date=${new Date().toLocaleString()}`;
        try {
          const GitRevision = new GitRevisionPlugin();
          appVersion += `,
            git-hash=${GitRevision.version()},
            git-branch=${GitRevision.branch()}`;
        } catch (error) {
          console.warn('当前项目未设置有效git仓库,无法注入git相关信息!');
        }
        args[0].appVersion = appVersion;
        // cdn
        ENABLE_CDN && (args[0].cdn = assetsCDN);
      }
      return args;
    });
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 优先级
            chunks: 'initial'
          },
          antd: {
            name: 'chunk-antd',
            test: /[\\/]node_modules[\\/]_?(ant-design-vue|@ant-design)(.*)/,
            priority: 20
          },
          components: {
            name: 'chunk-components',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk('single');
      // config.optimization.mergeDuplicateChunks=false;
    });
  },
  css: {
    sourceMap: !IS_PRODUCTION,
    loaderOptions: {
      less: {
        additionalData: '@import "@/assets/styles/_mixin.less";',
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true;@import "${resolve('./src/assets/styles/_variable.less')}"`
          }
        }
      }
    }
  }
};
