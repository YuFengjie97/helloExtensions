import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',            // 指定打包输出目录
    sourcemap: true,           // 生成 source map 文件，便于调试
    rollupOptions: {
      input: {
        background: path.resolve(__dirname, 'src/background/index.ts'),
        content: path.resolve(__dirname, 'src/content/index.ts'),
        popup: path.resolve(__dirname, 'src/popup/index.ts')
      },
    },
  },
  // server: {
  //   port: 3000,                // 本地开发服务器端口
  //   open: true,                // 启动开发服务器时自动打开浏览器
  // },
});
