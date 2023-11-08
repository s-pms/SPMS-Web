import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PurchaseDetailEntity } from './PurchaseDetailEntity'

export class PurchaseDetailService extends AbstractBaseService<PurchaseDetailEntity> {
  entityClass = PurchaseDetailEntity

  baseUrl = 'purchaseDetail'
}
