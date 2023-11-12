import { PurchaseDetailEntity } from './PurchaseDetailEntity'
import { PurchaseEntity } from './PurchaseEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'

export class PurchaseService extends AbstractBaseBillService<PurchaseDetailEntity, PurchaseEntity> {
  entityClass = PurchaseEntity

  baseUrl = 'purchase'
}
