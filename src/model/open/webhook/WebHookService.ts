import { WebHookEntity } from '@/model/open/webhook/WebHookEntity'
import { AbstractBaseService } from '@/base/AbstractBaseService'
import { IDictionary } from '@/airpower/interface/IDictionary'

export class WebHookService extends AbstractBaseService<WebHookEntity> {
  baseUrl = 'webhook'

  entityClass = WebHookEntity

  async getSceneList(): Promise<IDictionary[]> {
    const result = await this.api('getSceneList')
      .post()
    return (result as unknown as IDictionary[])
  }
}
