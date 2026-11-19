import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import unoCSS from 'unocss/vite';
import autoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import unpluginComponents from 'unplugin-vue-components/vite';
import { type ConfigEnv, defineConfig, loadEnv, lazyPlugins, type ProxyOptions } from 'vite-plus';
import buildInfo from 'vite-plugin-build-info';
import { compression } from 'vite-plugin-compression2';
import { envParse, parseLoadedEnv } from 'vite-plugin-env-parse';
import { createHtmlPlugin } from 'vite-plugin-html';
import iconfont from 'vite-plugin-iconfont';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';
import vueDevTools from 'vite-plugin-vue-devtools';

import { themeToken } from './src/config/theme';

// 完整配置，请查阅https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd(); // 项目根目录
  const env = parseLoadedEnv(loadEnv(mode, root) as ImportMetaEnv);
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
    VITE_UPDATE_NOTICE = false,
    VITE_DEV_TOOLS = false
  } = env;

  /***** 接口代理配置，有多个可以自己加 ******/
  const PROXY_CONFIG: Record<string, string | ProxyOptions> = {
    [`^${VITE_API_PREFIX}`]: {
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
    lint: {
      plugins: ['unicorn', 'typescript', 'oxc', 'import', 'vue'],
      env: { browser: true, es2024: true },
      globals: { Iconfont: 'readonly', __APP_CONFIG__: 'readonly' },
      ignorePatterns: ['dist/**', 'public/**', 'mock/**', 'types/**'],
      jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
      rules: {
        'vite-plus/prefer-vite-plus-imports': 'error',
        'import/no-duplicates': 'error',
        // 老 ESLint 配置里刻意关闭的两条，保持一致
        'no-unused-expressions': 'off',
        'typescript/no-floating-promises': 'off'
      },
      options: { typeAware: true, typeCheck: false }
    },
    fmt: {
      printWidth: 120,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'none',
      sortPackageJson: false,
      // 生成/第三方文件不参与格式化
      ignorePatterns: ['dist/**', 'public/**', 'types/**', 'CHANGELOG.md']
    },
    // 提交前对暂存文件跑检查（替代 lint-staged 配置）
    staged: {
      '*': 'vp check --fix'
    },
    root, // 项目根目录
    base: VITE_BASE_URL, // 基础路径
    server: {
      // 开发配置
      // https: true,
      // host: '127.0.0.1',
      port: VITE_PORT || 8080,
      open: true,
      // cors: false, // 跨域
      proxy: PROXY_CONFIG
    },
    preview: {
      open: true,
      proxy: PROXY_CONFIG
    },
    resolve: {
      alias: {
        // 别名
        '@': createPath('./src')
      }
    },
    plugins: lazyPlugins(() => [
      vue(),
      vueJsx(),
      VITE_DEV_TOOLS && vueDevTools(), // 必须放到createHtmlPlugin前面
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        // template: 'index.html', // 模板路径
        inject: {
          data: {
            BASE_URL: VITE_BASE_URL,
            title: VITE_TITLE,
            injectScript: `
              <script>
                ${getGlobalConfig(env)}
              </script>
              <script src="${VITE_BASE_URL}iconfont/iconfont.js"></script>
            `
          }
        }
      }),
      // 自动导入组件 https://github.com/antfu/unplugin-auto-import
      autoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'types/auto-imports.d.ts',
        // resolvers: [AntDesignVueResolver()],
        dirs: ['src/composables', 'src/store', 'src/components'], // 需要自动导入的文件目录
        vueTemplate: true,
        resolvers: []
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
      // 注入打包和git信息，方便做版本追踪
      buildInfo(),
      envParse({
        dtsPath: './types/env.d.ts'
      }),
      iconfont({
        url: VITE_ICONFONT_URL,
        distUrl: './public/iconfont/iconfont.js',
        iconJson: './src/components/IconPicker/data.json',
        inject: false,
        dts: './types/iconfont.d.ts',
        iconifyFile: './.iconify.json'
      }),
      // 网站更新提醒
      VITE_UPDATE_NOTICE && webUpdateNotice(),
      IS_MOCK && mockDevServerPlugin(),
      // gzip压缩，需要nginx开启对应配置，否则不生效
      VITE_BUILD_COMPRESS && compression(),
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
    ]),
    build: {
      // 生产配置
      outDir: VITE_OUT_DIR, // 输出目录
      reportCompressedSize: false, //禁用 gzip 压缩大小报告,可以减少构建时间
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // 根据自己需求调整分包策略（Rolldown 只支持函数形式的 manualChunks）
          manualChunks(id: string) {
            if (/node_modules\/(?:@vue\/|vue\/|vue-router\/|pinia\/)/.test(id)) return 'vue';
            if (/node_modules\/(?:ant-design-vue|dayjs)\//.test(id)) return 'antd';
          },
          // 移出console.log和debugger调试信息，减少生产环境的js文件体积
          ...(IS_PRODUCTION && VITE_DROP_CONSOLE
            ? { minify: { compress: { dropConsole: true, dropDebugger: true } } }
            : {})
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
    }
  };
});
/********** 一些辅助函数 *********/
function createPath(url: string, metaUrl = import.meta.url) {
  return fileURLToPath(new URL(url, metaUrl));
}
function getGlobalConfig(env: Record<string, string | number | boolean>) {
  const config: Record<string, string | number | boolean> = {};
  for (const key in env) {
    if (key.startsWith('VITE_GLOBAL_')) {
      config[key] = env[key];
    }
  }
  return `window.__APP_CONFIG__=${JSON.stringify(config)};`;
}
