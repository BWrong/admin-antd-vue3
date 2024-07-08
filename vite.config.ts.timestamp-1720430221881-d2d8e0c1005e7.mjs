// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0__vue@3.4.31_typescript@5.5.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0__vue@3.4.31_typescript@5.5.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import legacy from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.1_terser@5.31.0_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { viteMockServe } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.21.5_mockjs@1.1.0_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-mock/dist/index.mjs";
import viteCompression from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-html/dist/index.mjs";
import autoImport from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/unplugin-auto-import@0.17.6_rollup@4.17.2/node_modules/unplugin-auto-import/dist/vite.js";
import unpluginComponents from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/unplugin-vue-components@0.27.2_@babel+parser@7.24.7_rollup@4.17.2_vue@3.4.31_typescript@5.5.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/unplugin-vue-components@0.27.2_@babel+parser@7.24.7_rollup@4.17.2_vue@3.4.31_typescript@5.5.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { VueHooksPlusResolver } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/@vue-hooks-plus+resolvers@1.2.5_vue-hooks-plus@2.2.0_vue@3.4.31_typescript@5.5.3__/node_modules/@vue-hooks-plus/resolvers/dist/index.js";
import { webUpdateNotice } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/@plugin-web-update-notification+vite@1.7.1_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/@plugin-web-update-notification/vite/dist/index.js";
import { visualizer } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.17.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import VueDevTools from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.5_rollup@4.17.2_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terse_yly4ffflthcwd4y6bevsciq7ja/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import buildInfo from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite-plugin-build-info@0.1.2/node_modules/vite-plugin-build-info/dist/index.js";
import iconfont from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite-plugin-iconfont@1.4.1_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-iconfont/dist/index.mjs";
import unoCSS from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/unocss@0.61.3_postcss@8.4.39_rollup@4.17.2_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/unocss/dist/vite.mjs";

// src/config/theme.ts
var themeToken = {
  colorPrimary: "#1890ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorLink: "#1890ff"
};

// vite.config.ts
import { resolve } from "node:path";
import { envParse, parseLoadedEnv } from "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/node_modules/.pnpm/vite-plugin-env-parse@1.0.14_vite@5.3.3_@types+node@20.14.10_less@4.2.0_terser@5.31.0_/node_modules/vite-plugin-env-parse/dist/index.js";
var __vite_injected_original_dirname = "/Users/bwrong/WorkSpace/00.Misthin/template-vue3";
var __vite_injected_original_import_meta_url = "file:///Users/bwrong/WorkSpace/00.Misthin/template-vue3/vite.config.ts";
var vite_config_default = defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = parseLoadedEnv(loadEnv(mode, root));
  console.log("\u3010info\u3011 command:", command, ", mode: ", mode);
  console.log(env);
  const IS_PRODUCTION = command === "build";
  const IS_MOCK = mode === "mock";
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
  console.log(VITE_DEVTOOLS, VITE_API_HOST);
  const PROXY_CONFIG = {
    [VITE_API_PREFIX]: {
      target: VITE_API_HOST,
      // secure: false,
      // ws: true,
      changeOrigin: true,
      // 将Origin的来源更改为目标URL
      rewrite: (path) => path.replace(new RegExp(`^${VITE_API_PREFIX}`), "/api")
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
    root,
    // 项目根目录
    base: VITE_BASE_URL,
    // 基础路径
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
      envParse({
        dtsPath: "./types/env.d.ts"
      }),
      // https://devtools-next.vuejs.org/
      VITE_DEVTOOLS && VueDevTools(),
      iconfont({
        url: VITE_ICONFONT_URL,
        distUrl: "./public/iconfont/iconfont.js",
        iconJson: "./src/components/IconPicker/data.json",
        inject: false,
        dts: "./types/iconfont.d.ts",
        iconifyFile: "./.iconify.json"
      }),
      // 网站更新提醒
      VITE_UPDATE_NOTICE && webUpdateNotice({
        versionType: "build_timestamp",
        checkInterval: 0,
        logVersion: true,
        injectFileBase: VITE_BASE_URL
      }),
      viteMockServe({
        ignore: /^_/,
        // 忽略的文件
        mockPath: "mock",
        // 设置mock文件目录
        watchFiles: true,
        // 修改更新
        enable: IS_MOCK
      }),
      vue({
        script: {
          propsDestructure: true
          // 开启props语法糖
        }
      }),
      createHtmlPlugin({
        minify: true,
        entry: "/src/main.ts",
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
        imports: ["vue", "vue-router", "pinia"],
        dts: "types/auto-imports.d.ts",
        // resolvers: [AntDesignVueResolver()],
        dirs: ["src/composables", "src/store"],
        // 需要自动导入的文件目录
        vueTemplate: true,
        resolvers: [VueHooksPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        }
      }),
      // 自动按需加载组件 https://github.com/antfu/unplugin-vue-components
      unpluginComponents({
        dts: "types/components.d.ts",
        dirs: ["src/components"],
        extensions: ["vue", "tsx"],
        directoryAsNamespace: false,
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
            // ant-design-vue采用cssinjs，不需要引入样式文件
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
      VITE_BUILD_COMPRESS && viteCompression({
        threshold: 1025,
        // 阈值，大于此值才会被压缩
        algorithm: "gzip"
        // 压缩算法
      }),
      // 开启打包可视化分析报告,会增加打包时间，不需要可以关闭
      VITE_BUILD_REPORT && visualizer({
        template: "treemap",
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
        "@": createPath("./src")
      }
    },
    preview: {
      open: true,
      proxy: PROXY_CONFIG
    },
    build: {
      // 生产配置
      outDir: VITE_OUT_DIR,
      // 输出目录
      reportCompressedSize: false,
      //禁用 gzip 压缩大小报告,可以减少构建时间
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          // 根据自己需求调整分包策略
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            antd: ["ant-design-vue", "dayjs"]
          }
        }
      }
    },
    css: {
      // transformer:'lightningcss',
      devSourcemap: true,
      // 开启css sourcemap
      // css预处理器配置
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            ...themeToken,
            hack: `true;@import "${resolve(__vite_injected_original_dirname, "./src/assets/styles/_variable.less")}"`
          }
        }
      }
    },
    esbuild: {
      drop: formatDrop(VITE_DROP_DEBUGGER, VITE_DROP_CONSOLE)
    }
  };
});
function createPath(url, metaUrl = __vite_injected_original_import_meta_url) {
  return fileURLToPath(new URL(url, metaUrl));
}
function formatDrop(dropDebugger, dropConsole) {
  let drop = [];
  dropDebugger && drop.push("debugger");
  dropConsole && drop.push("console");
  return drop;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2NvbmZpZy90aGVtZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9id3JvbmcvV29ya1NwYWNlLzAwLk1pc3RoaW4vdGVtcGxhdGUtdnVlM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2J3cm9uZy9Xb3JrU3BhY2UvMDAuTWlzdGhpbi90ZW1wbGF0ZS12dWUzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9id3JvbmcvV29ya1NwYWNlLzAwLk1pc3RoaW4vdGVtcGxhdGUtdnVlMy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgdHlwZSBDb25maWdFbnYsIHR5cGUgUHJveHlPcHRpb25zIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knO1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCc7XG5pbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCB1bnBsdWdpbkNvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgeyBWdWVIb29rc1BsdXNSZXNvbHZlciB9IGZyb20gJ0B2dWUtaG9va3MtcGx1cy9yZXNvbHZlcnMnXG5pbXBvcnQgeyB3ZWJVcGRhdGVOb3RpY2UgfSBmcm9tICdAcGx1Z2luLXdlYi11cGRhdGUtbm90aWZpY2F0aW9uL3ZpdGUnO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IGJ1aWxkSW5mbyBmcm9tICd2aXRlLXBsdWdpbi1idWlsZC1pbmZvJztcbmltcG9ydCBpY29uZm9udCBmcm9tICd2aXRlLXBsdWdpbi1pY29uZm9udCc7XG5pbXBvcnQgdW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJztcbmltcG9ydCB7IHRoZW1lVG9rZW4gfSBmcm9tICcuL3NyYy9jb25maWcvdGhlbWUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgeyBlbnZQYXJzZSxwYXJzZUxvYWRlZEVudiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWVudi1wYXJzZSdcblxuLy8gXHU1QjhDXHU2NTc0XHU5MTREXHU3RjZFXHVGRjBDXHU4QkY3XHU2N0U1XHU5NjA1aHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0VudikgPT4ge1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTsgLy8gXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XG4gIGNvbnN0IGVudiA9IHBhcnNlTG9hZGVkRW52KGxvYWRFbnYobW9kZSwgcm9vdCkgYXMgSW1wb3J0TWV0YUVudik7XG4gIGNvbnNvbGUubG9nKCdcdTMwMTBpbmZvXHUzMDExIGNvbW1hbmQ6JywgY29tbWFuZCwgJywgbW9kZTogJywgbW9kZSk7XG4gIGNvbnNvbGUubG9nKGVudik7XG4gIGNvbnN0IElTX1BST0RVQ1RJT04gPSBjb21tYW5kID09PSAnYnVpbGQnO1xuICBjb25zdCBJU19NT0NLID0gbW9kZSA9PT0gJ21vY2snO1xuICAvLyBcdThCRkJcdTUzRDZcdTczQUZcdTU4ODNcdTkxNERcdTdGNkVcbiAgY29uc3Qge1xuICAgIFZJVEVfQkFTRV9VUkwsXG4gICAgVklURV9BUElfSE9TVCxcbiAgICBWSVRFX1RJVExFLFxuICAgIFZJVEVfQVBJX1BSRUZJWCxcbiAgICBWSVRFX0JVSUxEX1JFUE9SVCxcbiAgICBWSVRFX0JVSUxEX0NPTVBSRVNTLFxuICAgIFZJVEVfUE9SVCxcbiAgICBWSVRFX0lDT05GT05UX1VSTCxcbiAgICBWSVRFX09VVF9ESVIsXG4gICAgVklURV9EUk9QX0NPTlNPTEUgPSBmYWxzZSxcbiAgICBWSVRFX0RST1BfREVCVUdHRVIgPSBmYWxzZSxcbiAgICBWSVRFX1VQREFURV9OT1RJQ0UgPSBmYWxzZSxcbiAgICBWSVRFX0RFVlRPT0xTID0gZmFsc2VcbiAgfSA9IGVudjtcbiAgY29uc29sZS5sb2coVklURV9ERVZUT09MUyxWSVRFX0FQSV9IT1NUKTtcblxuICAvKioqKiogXHU2M0E1XHU1M0UzXHU0RUUzXHU3NDA2XHU5MTREXHU3RjZFXHVGRjBDXHU2NzA5XHU1OTFBXHU0RTJBXHU1M0VGXHU0RUU1XHU4MUVBXHU1REYxXHU1MkEwICoqKioqKi9cbiAgY29uc3QgUFJPWFlfQ09ORklHOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBQcm94eU9wdGlvbnM+ID0ge1xuICAgIFtWSVRFX0FQSV9QUkVGSVhdOiB7XG4gICAgICB0YXJnZXQ6IFZJVEVfQVBJX0hPU1QsXG4gICAgICAvLyBzZWN1cmU6IGZhbHNlLFxuICAgICAgLy8gd3M6IHRydWUsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NUMwNk9yaWdpblx1NzY4NFx1Njc2NVx1NkU5MFx1NjZGNFx1NjUzOVx1NEUzQVx1NzZFRVx1NjgwN1VSTFxuICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtWSVRFX0FQSV9QUkVGSVh9YCksICcvYXBpJylcbiAgICB9XG4gICAgLy8gXHU1M0VGXHU0RUU1XHU4MUVBXHU4ODRDXHU2REZCXHU1MkEwXHU2NkY0XHU1OTFBXHVGRjBDXHU1OTFBXHU0RTJBXHU0RUUzXHU3NDA2XHU3Njg0XHU2NUY2XHU1MDE5XHU5NzAwXHU4OTgxXHU1NDBDXHU2QjY1XHU0RkVFXHU2NTM5cmVxdWVzdFx1RkYxQVxuICAgIC8vIFx1NjVCOVx1NUYwRjFcdUZGMUFcdTUyMUJcdTVFRkFcdTU5MUFcdTRFMkFyZXF1ZXN0XHU1QjlFXHU0RjhCXHVGRjFCXG4gICAgLy8gXHU2NUI5XHU1RjBGMlx1RkYxQXJlcXVlc3RcdTc2ODRiYXNlVVJMXHU4QkJFXHU3RjZFXHU2MjEwL1x1RkYwQ1x1NzEzNlx1NTQwRVx1NTcyOFx1NjNBNVx1NTNFM3VybFx1NTI0RFx1OTc2Mlx1NjJGQ1x1NjNBNVx1NEUwQVx1NEVFM1x1NzQwNlx1NzY4NHByZWZpeFxuICAgIC8vICcvdGVzdEFwaSc6IHtcbiAgICAvLyAgIHRhcmdldDonOi8vdGVzdC5hcGkuY29tJyxcbiAgICAvLyB9LFxuICAgIC8vICAnL3Rlc3RBcGkyJzoge1xuICAgIC8vICAgdGFyZ2V0Oic6Ly90ZXN0LmFwaTIuY29tJyxcbiAgICAvLyB9XG4gIH07XG4gIHJldHVybiB7XG4gICAgcm9vdCwgLy8gXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XG4gICAgYmFzZTogVklURV9CQVNFX1VSTCwgLy8gXHU1N0ZBXHU3ODQwXHU4REVGXHU1Rjg0XG4gICAgc2VydmVyOiB7XG4gICAgICAvLyBcdTVGMDBcdTUzRDFcdTkxNERcdTdGNkVcbiAgICAgIC8vIGh0dHBzOiB0cnVlLFxuICAgICAgLy8gaG9zdDogJzEyNy4wLjAuMScsXG4gICAgICBwb3J0OiBWSVRFX1BPUlQgfHwgODA4MCxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICAvLyBjb3JzOiBmYWxzZSwgLy8gXHU4REU4XHU1N0RGXG4gICAgICBwcm94eTogSVNfTU9DSyA/IHt9IDogUFJPWFlfQ09ORklHXG4gICAgfSxcblxuICAgIHBsdWdpbnM6IFtcbiAgICAgIGVudlBhcnNlKHtcbiAgICAgICAgZHRzUGF0aDogJy4vdHlwZXMvZW52LmQudHMnXG4gICAgICB9KSxcbiAgICAgIC8vIGh0dHBzOi8vZGV2dG9vbHMtbmV4dC52dWVqcy5vcmcvXG4gICAgICBWSVRFX0RFVlRPT0xTICYmIFZ1ZURldlRvb2xzKCksXG4gICAgICBpY29uZm9udCh7XG4gICAgICAgIHVybDogVklURV9JQ09ORk9OVF9VUkwsXG4gICAgICAgIGRpc3RVcmw6ICcuL3B1YmxpYy9pY29uZm9udC9pY29uZm9udC5qcycsXG4gICAgICAgIGljb25Kc29uOiAnLi9zcmMvY29tcG9uZW50cy9JY29uUGlja2VyL2RhdGEuanNvbicsXG4gICAgICAgIGluamVjdDogZmFsc2UsXG4gICAgICAgIGR0czogJy4vdHlwZXMvaWNvbmZvbnQuZC50cycsXG4gICAgICAgIGljb25pZnlGaWxlOiAnLi8uaWNvbmlmeS5qc29uJ1xuICAgICAgfSksXG4gICAgICAvLyBcdTdGNTFcdTdBRDlcdTY2RjRcdTY1QjBcdTYzRDBcdTkxOTJcbiAgICAgIFZJVEVfVVBEQVRFX05PVElDRSAmJlxuICAgICAgd2ViVXBkYXRlTm90aWNlKHtcbiAgICAgICAgdmVyc2lvblR5cGU6ICdidWlsZF90aW1lc3RhbXAnLFxuICAgICAgICBjaGVja0ludGVydmFsOiAwLFxuICAgICAgICBsb2dWZXJzaW9uOiB0cnVlLFxuICAgICAgICBpbmplY3RGaWxlQmFzZTogVklURV9CQVNFX1VSTFxuICAgICAgfSksXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgICAgaWdub3JlOiAvXl8vLCAvLyBcdTVGRkRcdTc1NjVcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgICAgbW9ja1BhdGg6ICdtb2NrJywgLy8gXHU4QkJFXHU3RjZFbW9ja1x1NjU4N1x1NEVGNlx1NzZFRVx1NUY1NVxuICAgICAgICB3YXRjaEZpbGVzOiB0cnVlLCAvLyBcdTRGRUVcdTY1MzlcdTY2RjRcdTY1QjBcbiAgICAgICAgZW5hYmxlOiBJU19NT0NLXG4gICAgICB9KSxcbiAgICAgIHZ1ZSh7XG4gICAgICAgIHNjcmlwdDoge1xuICAgICAgICAgIHByb3BzRGVzdHJ1Y3R1cmU6IHRydWUgLy8gXHU1RjAwXHU1NDJGcHJvcHNcdThCRURcdTZDRDVcdTdDRDZcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxuICAgICAgICBlbnRyeTogJy9zcmMvbWFpbi50cycsXG4gICAgICAgIC8vIHRlbXBsYXRlOiAnaW5kZXguaHRtbCcsIC8vIFx1NkEyMVx1Njc3Rlx1OERFRlx1NUY4NFxuICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBCQVNFX1VSTDogVklURV9CQVNFX1VSTCxcbiAgICAgICAgICAgIHRpdGxlOiBWSVRFX1RJVExFLFxuICAgICAgICAgICAgaW5qZWN0U2NyaXB0OiBgXG4gICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiJHtWSVRFX0JBU0VfVVJMfWNvbmZpZy5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cIiR7VklURV9CQVNFX1VSTH1pY29uZm9udC9pY29uZm9udC5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgYFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICAvLyBcdTY1MkZcdTYzMDFqc3hcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3RUM0XHU0RUY2IGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1hdXRvLWltcG9ydFxuICAgICAgYXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAncGluaWEnXSxcbiAgICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICAvLyByZXNvbHZlcnM6IFtBbnREZXNpZ25WdWVSZXNvbHZlcigpXSxcbiAgICAgICAgZGlyczogWydzcmMvY29tcG9zYWJsZXMnLCAnc3JjL3N0b3JlJ10sIC8vIFx1OTcwMFx1ODk4MVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NzY4NFx1NjU4N1x1NEVGNlx1NzZFRVx1NUY1NVxuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICAgICAgcmVzb2x2ZXJzOiBbVnVlSG9va3NQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBmaWxlcGF0aDogJy4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nLFxuICAgICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICAvLyBcdTgxRUFcdTUyQThcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcdTdFQzRcdTRFRjYgaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXG4gICAgICB1bnBsdWdpbkNvbXBvbmVudHMoe1xuICAgICAgICBkdHM6ICd0eXBlcy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ10sXG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ3RzeCddLFxuICAgICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogZmFsc2UsXG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcbiAgICAgICAgICAgIGltcG9ydFN0eWxlOiBmYWxzZSAvLyBhbnQtZGVzaWduLXZ1ZVx1OTFDN1x1NzUyOGNzc2luanNcdUZGMENcdTRFMERcdTk3MDBcdTg5ODFcdTVGMTVcdTUxNjVcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjZcbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICB9KSxcbiAgICAgIC8vIGh0dHBzOi8vdW5vY3NzLmRldi9pbnRlZ3JhdGlvbnMvdml0ZVxuICAgICAgdW5vQ1NTKCksXG4gICAgICAvLyBcdTUxN0NcdTVCQjlcdTZENEZcdTg5QzhcdTU2NjhcdThCQkVcdTdGNkVcdUZGMENcdTlFRDhcdThCQTRcdThCRkJcdTUzRDZicm93c2Vyc2xpc3RyY1x1OTE0RFx1N0Y2RVxuICAgICAgbGVnYWN5KCksXG4gICAgICAvLyBcdTZDRThcdTUxNjVcdTYyNTNcdTUzMDVcdTU0OENnaXRcdTRGRTFcdTYwNkZcdUZGMENcdTY1QjlcdTRGQkZcdTUwNUFcdTcyNDhcdTY3MkNcdThGRkRcdThFMkFcbiAgICAgIGJ1aWxkSW5mbygpLFxuICAgICAgLy8gZ3ppcFx1NTM4Qlx1N0YyOVx1RkYwQ1x1OTcwMFx1ODk4MW5naW54XHU1RjAwXHU1NDJGXHU1QkY5XHU1RTk0XHU5MTREXHU3RjZFXHVGRjBDXHU1NDI2XHU1MjE5XHU0RTBEXHU3NTFGXHU2NTQ4XG4gICAgICBWSVRFX0JVSUxEX0NPTVBSRVNTICYmXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICB0aHJlc2hvbGQ6IDEwMjUsIC8vIFx1OTYwOFx1NTAzQ1x1RkYwQ1x1NTkyN1x1NEU4RVx1NkI2NFx1NTAzQ1x1NjI0RFx1NEYxQVx1ODhBQlx1NTM4Qlx1N0YyOVxuICAgICAgICBhbGdvcml0aG06ICdnemlwJyAvLyBcdTUzOEJcdTdGMjlcdTdCOTdcdTZDRDVcbiAgICAgIH0pLFxuICAgICAgLy8gXHU1RjAwXHU1NDJGXHU2MjUzXHU1MzA1XHU1M0VGXHU4OUM2XHU1MzE2XHU1MjA2XHU2NzkwXHU2MkE1XHU1NDRBLFx1NEYxQVx1NTg5RVx1NTJBMFx1NjI1M1x1NTMwNVx1NjVGNlx1OTVGNFx1RkYwQ1x1NEUwRFx1OTcwMFx1ODk4MVx1NTNFRlx1NEVFNVx1NTE3M1x1OTVFRFxuICAgICAgVklURV9CVUlMRF9SRVBPUlQgJiZcbiAgICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgICB0ZW1wbGF0ZTogJ3RyZWVtYXAnLFxuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgICAgLy8gZW1pdEZpbGU6IHRydWUsXG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZVxuICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8vIFx1NTIyQlx1NTQwRFxuICAgICAgICAnQCc6IGNyZWF0ZVBhdGgoJy4vc3JjJylcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBwcm94eTogUFJPWFlfQ09ORklHXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgLy8gXHU3NTFGXHU0RUE3XHU5MTREXHU3RjZFXG4gICAgICBvdXREaXI6IFZJVEVfT1VUX0RJUiwgLy8gXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsIC8vXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBLFx1NTNFRlx1NEVFNVx1NTFDRlx1NUMxMVx1Njc4NFx1NUVGQVx1NjVGNlx1OTVGNFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgICAvLyBcdTY4MzlcdTYzNkVcdTgxRUFcdTVERjFcdTk3MDBcdTZDNDJcdThDMDNcdTY1NzRcdTUyMDZcdTUzMDVcdTdCNTZcdTc1NjVcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAgIHZ1ZTogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxuICAgICAgICAgICAgYW50ZDogWydhbnQtZGVzaWduLXZ1ZScsICdkYXlqcyddXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIC8vIHRyYW5zZm9ybWVyOidsaWdodG5pbmdjc3MnLFxuICAgICAgZGV2U291cmNlbWFwOiB0cnVlLCAvLyBcdTVGMDBcdTU0MkZjc3Mgc291cmNlbWFwXG4gICAgICAvLyBjc3NcdTk4ODRcdTU5MDRcdTc0MDZcdTU2NjhcdTkxNERcdTdGNkVcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIG1vZGlmeVZhcnM6IHtcbiAgICAgICAgICAgIC4uLnRoZW1lVG9rZW4sXG4gICAgICAgICAgICBoYWNrOiBgdHJ1ZTtAaW1wb3J0IFwiJHtyZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cy9zdHlsZXMvX3ZhcmlhYmxlLmxlc3MnKX1cImBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIGRyb3A6IGZvcm1hdERyb3AoVklURV9EUk9QX0RFQlVHR0VSLCBWSVRFX0RST1BfQ09OU09MRSlcbiAgICB9XG4gIH07XG59KTtcbi8qKioqKioqKioqIFx1NEUwMFx1NEU5Qlx1OEY4NVx1NTJBOVx1NTFGRFx1NjU3MCAqKioqKioqKiovXG5mdW5jdGlvbiBjcmVhdGVQYXRoKHVybDogc3RyaW5nLCBtZXRhVXJsID0gaW1wb3J0Lm1ldGEudXJsKSB7XG4gIHJldHVybiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwodXJsLCBtZXRhVXJsKSk7XG59XG5mdW5jdGlvbiBmb3JtYXREcm9wKGRyb3BEZWJ1Z2dlcjogYm9vbGVhbiwgZHJvcENvbnNvbGU6IGJvb2xlYW4pIHtcbiAgbGV0IGRyb3A6IGFueSA9IFtdO1xuICBkcm9wRGVidWdnZXIgJiYgZHJvcC5wdXNoKCdkZWJ1Z2dlcicpO1xuICBkcm9wQ29uc29sZSAmJiBkcm9wLnB1c2goJ2NvbnNvbGUnKTtcbiAgcmV0dXJuIGRyb3A7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9id3JvbmcvV29ya1NwYWNlLzAwLk1pc3RoaW4vdGVtcGxhdGUtdnVlMy9zcmMvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYndyb25nL1dvcmtTcGFjZS8wMC5NaXN0aGluL3RlbXBsYXRlLXZ1ZTMvc3JjL2NvbmZpZy90aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYndyb25nL1dvcmtTcGFjZS8wMC5NaXN0aGluL3RlbXBsYXRlLXZ1ZTMvc3JjL2NvbmZpZy90aGVtZS50c1wiO2ltcG9ydCB0eXBlIHsgVGhlbWVDb25maWcgfSBmcm9tICdhbnQtZGVzaWduLXZ1ZS9lcy9jb25maWctcHJvdmlkZXIvY29udGV4dCc7XG4vLyBcdTRFM0JcdTk4OThcdTk4OUNcdTgyNzJcdThCQkVcdTdGNkVcdUZGMENcdTUzRUZcdTRFRTVcdTRGNUNcdTc1MjhcdTRFOEVcdTgxRUFcdTVCOUFcdTRFNDlcdTY4MzdcdTVGMEZcdTU0OENcdTdFQzRcdTRFRjZcdTVFOTNcdTY4MzdcdTVGMEZcdUZGMENcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjhhbnRkdlx1N0YxNlx1OEY5MVx1NTY2OFx1N0YxNlx1OEY5MVx1NTQwRVx1NzY4NFx1NjU3MFx1NjM2RWh0dHBzOi8vbmV4dC5hbnRkdi5jb20vdGhlbWUtZWRpdG9yLWNuXG5leHBvcnQgY29uc3QgdGhlbWVUb2tlbjogVGhlbWVDb25maWdbJ3Rva2VuJ10gPSB7XG4gIGNvbG9yUHJpbWFyeTogJyMxODkwZmYnLFxuICBjb2xvclN1Y2Nlc3M6ICcjNTJjNDFhJyxcbiAgY29sb3JXYXJuaW5nOiAnI2ZhYWQxNCcsXG4gIGNvbG9yRXJyb3I6ICcjZmY0ZDRmJyxcbiAgY29sb3JMaW5rOiAnIzE4OTBmZidcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsZUFBZSxXQUFXO0FBQ3JXLFNBQVMsY0FBYyxlQUFlO0FBRXRDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxZQUFZO0FBQ25CLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMsd0JBQXdCO0FBQ2pDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sd0JBQXdCO0FBQy9CLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGNBQWM7QUFDckIsT0FBTyxZQUFZOzs7QUNoQlosSUFBTSxhQUFtQztBQUFBLEVBQzlDLGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFDYjs7O0FEWUEsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsVUFBUyxzQkFBc0I7QUFyQnhDLElBQU0sbUNBQW1DO0FBQStKLElBQU0sMkNBQTJDO0FBd0J6UCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFpQjtBQUM1RCxRQUFNLE9BQU8sUUFBUSxJQUFJO0FBQ3pCLFFBQU0sTUFBTSxlQUFlLFFBQVEsTUFBTSxJQUFJLENBQWtCO0FBQy9ELFVBQVEsSUFBSSw2QkFBbUIsU0FBUyxZQUFZLElBQUk7QUFDeEQsVUFBUSxJQUFJLEdBQUc7QUFDZixRQUFNLGdCQUFnQixZQUFZO0FBQ2xDLFFBQU0sVUFBVSxTQUFTO0FBRXpCLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG9CQUFvQjtBQUFBLElBQ3BCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLEVBQ2xCLElBQUk7QUFDSixVQUFRLElBQUksZUFBYyxhQUFhO0FBR3ZDLFFBQU0sZUFBc0Q7QUFBQSxJQUMxRCxDQUFDLGVBQWUsR0FBRztBQUFBLE1BQ2pCLFFBQVE7QUFBQTtBQUFBO0FBQUEsTUFHUixjQUFjO0FBQUE7QUFBQSxNQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxlQUFlLEVBQUUsR0FBRyxNQUFNO0FBQUEsSUFDM0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVVGO0FBQ0EsU0FBTztBQUFBLElBQ0w7QUFBQTtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUEsSUFDTixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJTixNQUFNLGFBQWE7QUFBQSxNQUNuQixNQUFNO0FBQUE7QUFBQSxNQUVOLE9BQU8sVUFBVSxDQUFDLElBQUk7QUFBQSxJQUN4QjtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUFBO0FBQUEsTUFFRCxpQkFBaUIsWUFBWTtBQUFBLE1BQzdCLFNBQVM7QUFBQSxRQUNQLEtBQUs7QUFBQSxRQUNMLFNBQVM7QUFBQSxRQUNULFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLEtBQUs7QUFBQSxRQUNMLGFBQWE7QUFBQSxNQUNmLENBQUM7QUFBQTtBQUFBLE1BRUQsc0JBQ0EsZ0JBQWdCO0FBQUEsUUFDZCxhQUFhO0FBQUEsUUFDYixlQUFlO0FBQUEsUUFDZixZQUFZO0FBQUEsUUFDWixnQkFBZ0I7QUFBQSxNQUNsQixDQUFDO0FBQUEsTUFDRCxjQUFjO0FBQUEsUUFDWixRQUFRO0FBQUE7QUFBQSxRQUNSLFVBQVU7QUFBQTtBQUFBLFFBQ1YsWUFBWTtBQUFBO0FBQUEsUUFDWixRQUFRO0FBQUEsTUFDVixDQUFDO0FBQUEsTUFDRCxJQUFJO0FBQUEsUUFDRixRQUFRO0FBQUEsVUFDTixrQkFBa0I7QUFBQTtBQUFBLFFBQ3BCO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxpQkFBaUI7QUFBQSxRQUNmLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQTtBQUFBLFFBRVAsUUFBUTtBQUFBLFVBQ04sTUFBTTtBQUFBLFlBQ0osVUFBVTtBQUFBLFlBQ1YsT0FBTztBQUFBLFlBQ1AsY0FBYztBQUFBLDZCQUNHLGFBQWE7QUFBQSw2QkFDYixhQUFhO0FBQUE7QUFBQSxVQUVoQztBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQTtBQUFBLE1BRUQsT0FBTztBQUFBO0FBQUEsTUFFUCxXQUFXO0FBQUEsUUFDVCxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQSxRQUN0QyxLQUFLO0FBQUE7QUFBQSxRQUVMLE1BQU0sQ0FBQyxtQkFBbUIsV0FBVztBQUFBO0FBQUEsUUFDckMsYUFBYTtBQUFBLFFBQ2IsV0FBVyxDQUFDLHFCQUFxQixDQUFDO0FBQUEsUUFDbEMsVUFBVTtBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFVBQ1Ysa0JBQWtCO0FBQUEsUUFDcEI7QUFBQSxNQUNGLENBQUM7QUFBQTtBQUFBLE1BRUQsbUJBQW1CO0FBQUEsUUFDakIsS0FBSztBQUFBLFFBQ0wsTUFBTSxDQUFDLGdCQUFnQjtBQUFBLFFBQ3ZCLFlBQVksQ0FBQyxPQUFPLEtBQUs7QUFBQSxRQUN6QixzQkFBc0I7QUFBQSxRQUN0QixXQUFXO0FBQUEsVUFDVCxxQkFBcUI7QUFBQSxZQUNuQixhQUFhO0FBQUE7QUFBQSxVQUNmLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRixDQUFDO0FBQUE7QUFBQSxNQUVELE9BQU87QUFBQTtBQUFBLE1BRVAsT0FBTztBQUFBO0FBQUEsTUFFUCxVQUFVO0FBQUE7QUFBQSxNQUVWLHVCQUNBLGdCQUFnQjtBQUFBLFFBQ2QsV0FBVztBQUFBO0FBQUEsUUFDWCxXQUFXO0FBQUE7QUFBQSxNQUNiLENBQUM7QUFBQTtBQUFBLE1BRUQscUJBQ0EsV0FBVztBQUFBLFFBQ1QsVUFBVTtBQUFBLFFBQ1YsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsWUFBWTtBQUFBO0FBQUEsUUFFWixXQUFXO0FBQUEsTUFDYixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsUUFFTCxLQUFLLFdBQVcsT0FBTztBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLE9BQU87QUFBQTtBQUFBLE1BRUwsUUFBUTtBQUFBO0FBQUEsTUFDUixzQkFBc0I7QUFBQTtBQUFBLE1BQ3RCLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsVUFFaEIsY0FBYztBQUFBLFlBQ1osS0FBSyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsWUFDbEMsTUFBTSxDQUFDLGtCQUFrQixPQUFPO0FBQUEsVUFDbEM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQTtBQUFBLE1BRUgsY0FBYztBQUFBO0FBQUE7QUFBQSxNQUVkLHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFVBQ25CLFlBQVk7QUFBQSxZQUNWLEdBQUc7QUFBQSxZQUNILE1BQU0saUJBQWlCLFFBQVEsa0NBQVcsb0NBQW9DLENBQUM7QUFBQSxVQUNqRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTSxXQUFXLG9CQUFvQixpQkFBaUI7QUFBQSxJQUN4RDtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsU0FBUyxXQUFXLEtBQWEsVUFBVSwwQ0FBaUI7QUFDMUQsU0FBTyxjQUFjLElBQUksSUFBSSxLQUFLLE9BQU8sQ0FBQztBQUM1QztBQUNBLFNBQVMsV0FBVyxjQUF1QixhQUFzQjtBQUMvRCxNQUFJLE9BQVksQ0FBQztBQUNqQixrQkFBZ0IsS0FBSyxLQUFLLFVBQVU7QUFDcEMsaUJBQWUsS0FBSyxLQUFLLFNBQVM7QUFDbEMsU0FBTztBQUNUOyIsCiAgIm5hbWVzIjogW10KfQo=
