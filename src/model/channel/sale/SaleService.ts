import { SaleEntity } from './SaleEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { SaleDetailEntity } from './SaleDetailEntity'

export class SaleService extends AbstractBaseBillService<SaleDetailEntity, SaleEntity> {
  entityClass = SaleEntity

  baseUrl = 'sale'
}
