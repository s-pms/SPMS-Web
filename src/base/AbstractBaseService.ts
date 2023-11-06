import { BaseEntity } from './BaseEntity'
import { AirHttp } from '@/airpower/helper/AirHttp'
import { AirAbstractEntityService } from '@/airpower/base/AirAbstractEntityService'

/**
 * # 抽象服务基类
 * @author Hamm
 */
export abstract class AbstractBaseService<E extends BaseEntity> extends AirAbstractEntityService<E> {
  api(url: string, baseUrl?: string | undefined): AirHttp {
    return super.api(url, baseUrl)
      .addHttpHeader('hello', 'world')
  }
}
