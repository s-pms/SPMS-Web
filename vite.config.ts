/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  build: {
    assetsDir: 'assets-vite-config',
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
        target: 'http://192.168.110.32:8080/',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
      },
      target: 'http://192.168.110.32:8080/',
    },
  },
})
