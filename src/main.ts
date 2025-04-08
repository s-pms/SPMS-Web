import { routes } from '@/config/routes'
import { app } from '@airpower'
import { AirConfig } from '@airpower/config/AirConfig'

import { AirRouter } from '@airpower/helper/AirRouter'
import '@/assets/css/main.scss'

AirConfig.appKey = 'spms'
AirConfig.uploadUrl = '/api/file/upload'

// 开启所有表格斑马纹
// AirConfig.tableStripe = true

// 开启所有表格边框线
// AirConfig.tableBorder = true

app.use(AirRouter.createRouter(routes)).mount('#app')
