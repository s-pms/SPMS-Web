import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PurchaseEntity } from './PurchaseEntity'

export class PurchaseService extends AbstractBaseService<PurchaseEntity> {
  entityClass = PurchaseEntity

  baseUrl = 'purchase'

  async audit(entity: PurchaseEntity): Promise<void> {
    await this.api('audit').post(entity)
  }
}
