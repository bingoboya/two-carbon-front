import type { UserConfig, ConfigEnv } from "vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// import { fileURLToPath, URL } from "node:url";
import VueDevTools from "vite-plugin-vue-devtools";
// 配置压缩
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
//https://github.com/element-plus/unplugin-element-plus/blob/HEAD/README.zh-CN.md
import ElementPlus from 'unplugin-element-plus/vite'
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // const env = loadEnv(mode, process.cwd(), '')
  console.log(command, mode);
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus({
        // useSource: true
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
      VueDevTools(),
    ],
    publicDir: "public",
    base: "./",
    server: { //主要是加上这段代码
      host: '127.0.0.1',
      port: 8112,
      proxy: {
        '/api': {
          // http://127.0.0.1:4523/m1/5226149-4892951-default/api/user?id=2
          target: 'http://127.0.0.1:4523/m1/5226149-4892951-default/',	//实际请求地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        components: resolve(__dirname, "./src/components"),
        api: resolve(__dirname, "./src/api"),
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
    },
  };
});
