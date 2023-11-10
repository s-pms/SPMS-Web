import { AbstractBaseService } from '@/base/AbstractBaseService'
import { SaleDetailEntity } from './SaleDetailEntity'

export class SaleDetailService extends AbstractBaseService<SaleDetailEntity> {
  entityClass = SaleDetailEntity

  baseUrl = 'saleDetail'
}
