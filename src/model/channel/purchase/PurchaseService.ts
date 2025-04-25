import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { PurchaseDetailEntity } from './PurchaseDetailEntity'
import { PurchaseEntity } from './PurchaseEntity'

export class PurchaseService extends AbstractBaseBillService<PurchaseDetailEntity, PurchaseEntity> {
  entityClass = PurchaseEntity

  baseUrl = 'purchase'
}
