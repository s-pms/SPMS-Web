/* eslint-disable no-console */
import { PermissionUtil, RouterUtil, WebConfig } from '@airpower/web'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp, version } from 'vue'
import App from '@/App.vue'
import { routes } from '@/config/routes'
import { OutputEntity } from '@/model/wms/output/OutputEntity'
import '@airpower/web/dist/web.css'
import '@/assets/css/main.scss'

WebConfig.elementPlusLocale = zhCn
WebConfig.appKey = 'spms'
WebConfig.product = 'SPMS'
WebConfig.uploadUrl = '/api/file/upload'
WebConfig.staticUrl = '/static/'

console.log(PermissionUtil.get(OutputEntity, 'update'))

createApp(App)
  .use(RouterUtil.createRouter(routes))
  .use(ElementPlus, {
    zIndex: 3000,
    locale: zhCn,
  })
  .mount('#app')

console.warn(`Vue Version: ${version}`)
console.warn(`ElementPlus Version: ${ElementPlus.version}`)
console.groupEnd()
