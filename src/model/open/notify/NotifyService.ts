import type { IWebEnum } from '@airpower/web'
import { AbstractBaseService } from '@/base/AbstractBaseService'
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'

export class NotifyService extends AbstractBaseService<NotifyEntity> {
  baseUrl = 'notify'

  entityClass = NotifyEntity

  /**
   * ### 获取通知场景
   */
  async getSceneList(): Promise<IWebEnum[]> {
    const result = await this.api('getSceneList').requestRaw()
    return result as unknown as IWebEnum[]
  }
}
