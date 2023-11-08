import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PurchaseEntity } from './PurchaseEntity'

export class PurchaseService extends AbstractBaseService<PurchaseEntity> {
  entityClass = PurchaseEntity

  baseUrl = 'purchase'
}
