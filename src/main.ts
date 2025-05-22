import App from '@/App.vue'
import { routes } from '@/config/routes'
import { RouterUtil, WebConfig } from '@airpower/web'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import '@airpower/web/dist/web.css'
import '@/assets/css/main.scss'

WebConfig.elementPlusLocale = zhCn
WebConfig.appKey = 'spms'
WebConfig.product = 'SPMS'
WebConfig.uploadUrl = '/api/file/upload'

createApp(App)
  .use(RouterUtil.createRouter(routes))
  .use(ElementPlus, {
    zIndex: 3000,
    locale: zhCn,
  })
  .mount('#app')
