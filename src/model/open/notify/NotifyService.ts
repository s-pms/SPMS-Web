import type { IDictionary } from '@airpower/interface/IDictionary'
import { AbstractBaseService } from '@/base/AbstractBaseService'
import { NotifyEntity } from '@/model/open/notify/NotifyEntity'

export class NotifyService extends AbstractBaseService<NotifyEntity> {
  baseUrl = 'notify'

  entityClass = NotifyEntity

  /**
   * ### 获取通知场景
   */
  async getSceneList(): Promise<IDictionary[]> {
    const result = await this.api('getSceneList').post()
    return result as unknown as IDictionary[]
  }
}
