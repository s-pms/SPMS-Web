import { AbstractBaseService } from '@/base/AbstractBaseService'
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'
import type { IWebEnum } from '@airpower/web'

export class NotifyService extends AbstractBaseService<NotifyEntity> {
  baseUrl = 'notify'

  entityClass = NotifyEntity

  /**
   * ### 获取通知场景
   */
  async getSceneList(): Promise<IWebEnum[]> {
    const result = await this.api('getSceneList').request()
    return result as unknown as IWebEnum[]
  }
}
