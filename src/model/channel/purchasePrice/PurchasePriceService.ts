import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PurchasePriceEntity } from './PurchasePriceEntity'

export class PurchasePriceService extends AbstractBaseService<PurchasePriceEntity> {
  entityClass = PurchasePriceEntity

  baseUrl = 'purchasePrice'
}
