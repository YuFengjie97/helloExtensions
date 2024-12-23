import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    watch: {},
    // sourcemap: true,
    minify: false,
    rollupOptions: {
      input: {
        background: path.resolve(__dirname, 'src/background/index.ts'),
        content: path.resolve(__dirname, 'src/content/index.ts'),
        popup: path.resolve(__dirname, 'html/popup.html'),
        chart: path.resolve(__dirname, 'html/chart.html')
        // popup: path.resolve(__dirname, 'src/popup/index.ts'),
        // chart: path.resolve(__dirname, 'src/chart/index.ts')
      },
      output: {
        // 禁用哈希后缀
        entryFileNames: '[name].js', // 输出文件名为原文件名
        assetFileNames: '[name][extname]', // 输出资源文件名为原文件名 + 扩展名
      },
    },
  },
  // server: {
  //   port: 3000,                // 本地开发服务器端口
  //   open: true,                // 启动开发服务器时自动打开浏览器
  // },
});
