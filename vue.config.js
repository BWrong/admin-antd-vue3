const { resolve } = require('path');
const mockServer = require('@bwrong/mock');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const openInEditor = require('launch-editor-middleware');
const pkg = require('./package');
const { VUE_APP_API_HOST, VUE_APP_API_TITLE, VUE_APP_API_PREFIX } = process.env;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_MOCK = process.env.NODE_ENV === 'mock';
const productionGzipExtensions = ['js', 'css', 'html', 'svg'];
const ENABLE_CDN = false; // 开启cdn
// cdn配置
const assetsCDN = {
  // webpack build externals
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
    '//cdn.jsdelivr.net/npm/vue@3.0.7/dist/vue.runtime.global.prod.js',
    '//cdn.jsdelivr.net/npm/vue-router@4.0.4/dist/vue-router.global.prod.js',
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
      // 支持在vue-dev-tools中打开组件
      app.use('/__open-in-editor', openInEditor());
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
    config.plugin('html').tap((args) => {
      // 修改title
      args[0].title = VUE_APP_API_TITLE;
      // 注入版本信息
      const GitRevision = new GitRevisionPlugin();
      args[0].appVersion = `
        app-version=${pkg.version},
        git-hash=${GitRevision.version()},
        git-branch=${GitRevision.branch()},
        build-date=${new Date().toLocaleString()}
      `;
      if (IS_PRODUCTION) {
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
    extract: IS_PRODUCTION,
    sourceMap: !IS_PRODUCTION,
    loaderOptions: {
      less: {
        additionalData: '@import "@/assets/styles/_mixin.less";',
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#1890ff', // 全局主色
            '@link-color': '#1890ff', // 链接色
            '@success-color': '#52c41a', // 成功色
            '@warning-color': '#faad14', // 警告色
            '@error-color': '#FF4D4F', // 错误色
            '@font-size-base': '14px', // 主字号
            '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
            '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
            '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
            '@border-radius-base': '4px', // 组件/浮层圆角
            '@border-color-base': '#d9d9d9', // 边框色
            '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
            '@btn-border-radius-base': '2px',
            '@btn-border-radius-sm': '2px',
            '@breadcrumb-link-color': '#333',
            '@breadcrumb-last-item-color': '@primary-color',
            '@layout-header-background': '@primary-color'
          }
        }
      }
    }
  }
};
