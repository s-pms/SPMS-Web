import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'

AirConfig.successCode = 200000
AirConfig.unAuthorizeCode = 401000
app.use(AirConfig.createRouter(routes)).mount('#app')
