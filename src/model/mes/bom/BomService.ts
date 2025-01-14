import { BomEntity } from './BomEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { BomDetailEntity } from '@/model/mes/bom/BomDetailEntity'

/**
 * # BOM接口服务
 * @author Hamm.cn
 */
export class BomService extends AbstractBaseBillService<BomDetailEntity, BomEntity> {
  baseUrl = 'bom'

  entityClass = BomEntity
}
