import { AbstractBaseService } from '@/base/AbstractBaseService'
import { BomEntity } from './BomEntity'

/**
 * # BOM接口服务
 * @author Hamm.cn
 */
export class BomService extends AbstractBaseService<BomEntity> {
  baseUrl = 'bom'

  entityClass = BomEntity
}
