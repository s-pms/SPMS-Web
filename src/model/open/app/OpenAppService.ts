import { AbstractBaseService } from '@/base/AbstractBaseService'
import { OpenAppEntity } from './OpenAppEntity'

export class OpenAppService extends AbstractBaseService<OpenAppEntity> {
  entityClass = OpenAppEntity

  baseUrl = 'openApp'

  /**
   * ### 通过应用Key获取一个应用
   * @param appKey 应用Key
   */
  async getAppByKey(appKey: string): Promise<OpenAppEntity> {
    const app = new OpenAppEntity()
    app.appKey = appKey
    return this.api('getByAppKey').request(app, OpenAppEntity)
  }

  /**
   * ### 重置指定应用的秘钥
   * @param app 应用
   */
  async resetSecret(app: OpenAppEntity): Promise<string> {
    const result = await this.api('resetSecret').post(app)
    return result as unknown as string
  }

  /**
   * ### 添加并获取秘钥
   * @param app 应用
   */
  async addAndGetSecret(app: OpenAppEntity): Promise<string> {
    const result = await this.api('add').post(app)
    return result as unknown as string
  }

  /**
   * ### 重置秘钥对
   * @param app 应用
   */
  async resetKeyPair(app: OpenAppEntity) {
    const result = await this.api('resetKeyPair').post(app)
    return result as unknown as string
  }
}
