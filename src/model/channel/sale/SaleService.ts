import { AbstractBaseService } from '@/base/AbstractBaseService'
import { SaleEntity } from './SaleEntity'

export class SaleService extends AbstractBaseService<SaleEntity> {
  entityClass = SaleEntity

  baseUrl = 'sale'

  async audit(entity: SaleEntity): Promise<void> {
    await this.api('audit').post(entity)
  }
}
