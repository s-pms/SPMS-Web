import type { PurchaseDetailEntity } from './PurchaseDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { PurchaseEntity } from './PurchaseEntity'

export class PurchaseService extends AbstractBaseBillService<PurchaseDetailEntity, PurchaseEntity> {
  entityClass = PurchaseEntity

  baseUrl = 'purchase'
}
