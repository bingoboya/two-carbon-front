import type { UserConfig, ConfigEnv } from "vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path'
import fs from 'fs-extra'
import { fileURLToPath, URL } from "node:url";
import VueDevTools from "vite-plugin-vue-devtools";
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteImagemin from 'vite-plugin-imagemin'
import { visualizer } from "rollup-plugin-visualizer"; // 分析包
// 配置压缩
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
//https://github.com/element-plus/unplugin-element-plus/blob/HEAD/README.zh-CN.md
// import ElementPlus from 'unplugin-element-plus/vite'
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // const env = loadEnv(mode, process.cwd(), '')
  const runtimeConfig = mode === 'development' ? 'runtime-config.dev.js' : 'runtime-config.js'
  console.log('defineConfigdefineConfigdefineConfig', command, mode);
  return {
    plugins: [
      vue(),
      {
        name: 'runtime-config',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/runtime-config.js') {
              res.setHeader('Content-Type', 'application/javascript')
              res.end(fs.readFileSync(resolve(__dirname, runtimeConfig), 'utf-8'))
            } else {
              next()
            }
          })
        },
        writeBundle() {
          fs.copySync(
            resolve(__dirname, 'runtime-config.js'),
            resolve(__dirname, 'dist/runtime-config.js')
          )
        }
      },
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
      AutoImport({
        // resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: 'src/auto-import.d.ts'
      }),
      // Components({
      //   // resolvers: [ElementPlusResolver()],
      // }),
      // ElementPlus({
      //   // useSource: true
      // }),
      viteImagemin({
        verbose:	true,	// 是否在控制台输出压缩结果
        // filter: , //	-	指定哪些资源不压缩
        disable:	true,	//是否禁用 压缩完背景图太糊了，效果确实牛逼
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 默认 false, 设置为 true 来禁用压缩
        threshold: 10240, // 只处理大于此大小的资源（单位：字节）。默认值为 0。
        algorithm: "gzip", // 使用 gzip 压缩
        ext: ".gz", // 输出文件的扩展名
        deleteOriginFile: false,
      }),
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 默认 false, 设置为 true 来禁用压缩
        threshold: 10240, // 只处理大于此大小的资源（单位：字节）。默认值为 0。
        algorithm: "brotliCompress", // 使用 brotli 压缩
        ext: ".br", // 输出文件的扩展名
        deleteOriginFile: false,
      }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        emitFile: true,
        filename: "stats.html",
      }),

      // VueDevTools(),
    ],
    publicDir: "public",
    base: "./",
    server: {
      //主要是加上这段代码
      host: "127.0.0.1",
      port: 8112,
      proxy: {
        "/api": {
          // http://127.0.0.1:4523/m1/5226149-4892951-default/api/user?id=2
          // target: "http://127.0.0.1:4523/m1/5226149-4892951-default/", //实际请求地址
          target: "http://127.0.0.1:9000/", //实际请求地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "api/"),
        },
      },
    },
    resolve: {
      alias: {
        // "@": resolve(__dirname, "./src"),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // charset: false,
          additionalData: `@use "./src/assets/css/variable.scss" as *;`,
        },
      },
    },
    build: {
      outDir: "dist",
      minify: "terser", //是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: !true,
          drop_debugger: true,
        },
        format: {
          comments: true, // 删除所有注释
        },
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          runtimeConfig: resolve(__dirname, 'runtime-config.js')
        },
        output: {
          manualChunks(id) {
            // 文件路径 id
            console.log("文件路径 id", id);

            const chunkArray = [
              "dayjs",
              "@element-plus",
              "vue",
              "vue-router",
              "echarts",
              "echarts-gl",
              "vue-echarts",
              "gsap",
              "pinia",
              "lodash",
            ];

            if (
              chunkArray.find((chunk) => id.includes(`node_modules/${chunk}/`))
            ) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split("/")
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || "[name]";
            return `js/${fileName}/[name].[hash].js`;
          },
        },
      },
    },
  };
});
