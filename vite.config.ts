import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { type ConfigEnv, type ProxyOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { viteMockServe } from 'vite-plugin-mock';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import autoImport from 'unplugin-auto-import/vite';
import unpluginComponents from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import VueDevTools from 'vite-plugin-vue-devtools'
import buildInfo from 'vite-plugin-build-info';
import iconfont from 'vite-plugin-iconfont';
import unoCSS from 'unocss/vite';
import { themeToken } from './src/config/theme';
import { resolve } from 'node:path';

// 完整配置，请查阅https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd(); // 项目根目录
  const env = formatEnv(loadEnv(mode, root)) as ImportMetaEnv;
  console.log('【info】 command:', command, ', mode: ', mode);
  console.log(env);
  const IS_PRODUCTION = command === 'build';
  const IS_MOCK = mode === 'mock';
  // 读取环境配置
  const {
    VITE_BASE_URL,
    VITE_API_HOST,
    VITE_TITLE,
    VITE_API_PREFIX,
    VITE_BUILD_REPORT,
    VITE_BUILD_COMPRESS,
    VITE_PORT,
    VITE_ICONFONT_URL,
    VITE_OUT_DIR,
    VITE_DROP_CONSOLE = false,
    VITE_DROP_DEBUGGER = false,
    VITE_UPDATE_NOTICE = false,
    VITE_DEVTOOLS = false
  } = env;
  console.log(VITE_DEVTOOLS,VITE_API_HOST);

  /***** 接口代理配置，有多个可以自己加 ******/
  const PROXY_CONFIG: Record<string, string | ProxyOptions> = {
    [VITE_API_PREFIX]: {
      target: VITE_API_HOST,
      // secure: false,
      // ws: true,
      changeOrigin: true, // 将Origin的来源更改为目标URL
      rewrite: (path) => path.replace(new RegExp(`^${VITE_API_PREFIX}`), '/api')
    }
    // 可以自行添加更多，多个代理的时候需要同步修改request：
    // 方式1：创建多个request实例；
    // 方式2：request的baseURL设置成/，然后在接口url前面拼接上代理的prefix
    // '/testApi': {
    //   target:'://test.api.com',
    // },
    //  '/testApi2': {
    //   target:'://test.api2.com',
    // }
  };
  return {
    root, // 项目根目录
    base: VITE_BASE_URL, // 基础路径
    server: {
      // 开发配置
      // https: true,
      // host: '127.0.0.1',
      port: VITE_PORT || 8080,
      open: true,
      // cors: false, // 跨域
      proxy: IS_MOCK ? {} : PROXY_CONFIG
    },

    plugins: [
      // https://devtools-next.vuejs.org/
      VITE_DEVTOOLS && VueDevTools(),
      iconfont({
        url: VITE_ICONFONT_URL,
        distUrl: './public/iconfont/iconfont.js',
        iconJson: './src/components/IconPicker/data.json',
        inject: false,
        dts: './types/iconfont.d.ts',
        iconifyFile: './.iconify.json'
      }),
      // 网站更新提醒
      VITE_UPDATE_NOTICE &&
      webUpdateNotice({
        versionType: 'build_timestamp',
        checkInterval: 0,
        logVersion: true,
        injectFileBase: VITE_BASE_URL
      }),
      viteMockServe({
        ignore: /^_/, // 忽略的文件
        mockPath: 'mock', // 设置mock文件目录
        watchFiles: true, // 修改更新
        enable: IS_MOCK
      }),
      vue({
        script: {
          propsDestructure: true // 开启props语法糖
        }
      }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        // template: 'index.html', // 模板路径
        inject: {
          data: {
            BASE_URL: VITE_BASE_URL,
            title: VITE_TITLE,
            injectScript: `
              <script src="${VITE_BASE_URL}config.js"></script>
              <script src="${VITE_BASE_URL}iconfont/iconfont.js"></script>
            `
          }
        }
      }),
      // 支持jsx
      vueJsx(),
      // 自动导入组件 https://github.com/antfu/unplugin-auto-import
      autoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'types/auto-imports.d.ts',
        // resolvers: [AntDesignVueResolver()],
        dirs: ['src/composables', 'src/store'], // 需要自动导入的文件目录
        vueTemplate: true,
        resolvers: [VueHooksPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      // 自动按需加载组件 https://github.com/antfu/unplugin-vue-components
      unpluginComponents({
        dts: 'types/components.d.ts',
        dirs: ['src/components'],
        extensions: ['vue', 'tsx'],
        directoryAsNamespace: false,
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // ant-design-vue采用cssinjs，不需要引入样式文件
          })
        ]
      }),
      // https://unocss.dev/integrations/vite
      unoCSS(),
      // 兼容浏览器设置，默认读取browserslistrc配置
      legacy(),
      // 注入打包和git信息，方便做版本追踪
      buildInfo(),
      // gzip压缩，需要nginx开启对应配置，否则不生效
      VITE_BUILD_COMPRESS &&
      viteCompression({
        threshold: 1025, // 阈值，大于此值才会被压缩
        algorithm: 'gzip' // 压缩算法
      }),
      // 开启打包可视化分析报告,会增加打包时间，不需要可以关闭
      VITE_BUILD_REPORT &&
      visualizer({
        template: 'treemap',
        open: true,
        gzipSize: true,
        brotliSize: true,
        // emitFile: true,
        sourcemap: true
      })
    ],
    resolve: {
      alias: {
        // 别名
        '@': createPath('./src')
      }
    },
    preview: {
      open: true,
      proxy: PROXY_CONFIG
    },
    build: {
      // 生产配置
      outDir: VITE_OUT_DIR, // 输出目录
      reportCompressedSize: false, //禁用 gzip 压缩大小报告,可以减少构建时间
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // 根据自己需求调整分包策略
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            antd: ['ant-design-vue', 'dayjs']
          }
        }
      }
    },
    css: {
      // transformer:'lightningcss',
      devSourcemap: true, // 开启css sourcemap
      // css预处理器配置
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            ...themeToken,
            hack: `true;@import "${resolve(__dirname, './src/assets/styles/_variable.less')}"`
          }
        }
      }
    },
    esbuild: {
      drop: formatDrop(VITE_DROP_DEBUGGER, VITE_DROP_CONSOLE)
    }
  };
});
/********** 一些辅助函数 *********/
function createPath(url: string, metaUrl = import.meta.url) {
  return fileURLToPath(new URL(url, metaUrl));
}
function formatEnv(data: Record<string, any>) {
  Object.entries(data).map(([key, item]) => {
    if (item === 'true') {
      item = true;
    } else if (item === 'false') {
      item = false;
    } else if (item.match(/^\d+$/g)) {
      item = Number(item);
    }
    data[key] = item;
  });
  return data;
}
function formatDrop(dropDebugger: boolean, dropConsole: boolean) {
  let drop: any = [];
  dropDebugger && drop.push('debugger');
  dropConsole && drop.push('console');
  return drop;
}
