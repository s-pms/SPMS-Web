import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { SaleDetailEntity } from './SaleDetailEntity'
import { SaleEntity } from './SaleEntity'

export class SaleService extends AbstractBaseBillService<SaleDetailEntity, SaleEntity> {
  entityClass = SaleEntity

  baseUrl = 'sale'
}
