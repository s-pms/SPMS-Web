import { AbstractBaseService } from '@/base/AbstractBaseService'
import { AppEntity } from './AppEntity'

export class AppService extends AbstractBaseService<AppEntity> {
  entityClass = AppEntity

  baseUrl = 'app'

  /**
   * # 通过应用Key获取一个应用
   * @param appKey 应用Key
   */
  async getAppByKey(appKey: string): Promise<AppEntity> {
    const app = new AppEntity()
    app.appKey = appKey
    const json = await this.api('getByAppKey').post(app)
    return AppEntity.fromJson(json)
  }

  /**
   * # 重置指定应用的秘钥
   * @param app 应用
   */
  async resetSecret(app: AppEntity): Promise<string> {
    const newSecret = await this.api('resetSecret').post(app.copy())
    return newSecret as unknown as string
  }
}
