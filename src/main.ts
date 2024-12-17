import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'
import { AirRouter } from './airpower/helper/AirRouter'

AirConfig.appKey = 'spms'

app.use(AirRouter.createRouter(routes))
  .mount('#app')
