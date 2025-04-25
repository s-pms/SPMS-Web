import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { SalePriceEntity } from './SalePriceEntity'

export class SalePriceService extends AbstractBaseService<SalePriceEntity> {
  entityClass = SalePriceEntity

  baseUrl = 'salePrice'

  async getByMaterialAndCustomer(materialId: number, customerId: number): Promise<SalePriceEntity | null> {
    const entity = new SalePriceEntity()
    entity.material = new MaterialEntity(materialId)
    entity.customer = new CustomerEntity(customerId)
    try {
      return this.api('getByMaterialAndCustomer').callbackError().request(entity, SalePriceEntity)
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
