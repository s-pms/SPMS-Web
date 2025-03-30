import { routes } from '@/config/routes'
import { app } from '@airpower'
import { AirConfig } from '@airpower/config/AirConfig'

import { AirRouter } from '@airpower/helper/AirRouter'
import '@/assets/css/main.scss'

AirConfig.appKey = 'spms'
AirConfig.uploadUrl = '/api/file/upload'

app.use(AirRouter.createRouter(routes)).mount('#app')
