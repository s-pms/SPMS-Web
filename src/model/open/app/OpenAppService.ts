import { AbstractBaseService } from '@/base/AbstractBaseService'
import { OpenAppEntity } from './OpenAppEntity'

export class OpenAppService extends AbstractBaseService<OpenAppEntity> {
  entityClass = OpenAppEntity

  baseUrl = 'open/app'

  /**
   * # 通过应用Key获取一个应用
   * @param appKey 应用Key
   */
  async getAppByKey(appKey: string): Promise<OpenAppEntity> {
    const app = new OpenAppEntity()
    app.appKey = appKey
    const json = await this.api('getByAppKey').post(app)
    return OpenAppEntity.fromJson(json)
  }

  /**
   * # 重置指定应用的秘钥
   * @param app 应用
   */
  async resetSecret(app: OpenAppEntity): Promise<string> {
    const result = await this.api('resetSecret')
      .post(app)
    return result as unknown as string
  }

  async addAndGetSecret(app: OpenAppEntity): Promise<string> {
    const result = await this.api('add')
      .post(app)
    return result as unknown as string
  }

  async resetKeyPair(app: OpenAppEntity) {
    const result = await this.api('resetKeyPair')
      .post(app)
    return result as unknown as string
  }
}
