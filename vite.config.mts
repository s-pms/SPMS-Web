import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  build: {
    assetsDir: 'assets',
    // 暂时设置为false vite的BUG keep_classnames不生效导致反射获取类失败
    minify: false,
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 3000,
    https: false,
    proxy: {
      '/api': {
        // target: 'https://spms.hamm.cn/api/',
        // target: 'http://10.0.0.8:8080/',
        target: 'http://127.0.0.1:8080/',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true,
      },
      // '/oauth2': 'https://spms.hamm.cn',
      '/oauth2': 'http://127.0.0.1:8080',
    },
  },
})
