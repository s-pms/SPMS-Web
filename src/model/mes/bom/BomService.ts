import { BomEntity } from './BomEntity'
import { AbstractBaseService } from '@/base/AbstractBaseService'

/**
 * # BOM接口服务
 * @author Hamm.cn
 */
export class BomService extends AbstractBaseService<BomEntity> {
  baseUrl = 'bom'

  entityClass = BomEntity
}
