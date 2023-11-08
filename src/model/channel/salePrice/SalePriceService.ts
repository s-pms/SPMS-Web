import { AbstractBaseService } from '@/base/AbstractBaseService'
import { SalePriceEntity } from './SalePriceEntity'

export class SalePriceService extends AbstractBaseService<SalePriceEntity> {
  entityClass = SalePriceEntity

  baseUrl = 'salePrice'
}
