import { AbstractBaseService } from '@/base/AbstractBaseService'
import { SalePriceEntity } from './SalePriceEntity'
import { CustomerEntity } from '../customer/CustomerEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'

export class SalePriceService extends AbstractBaseService<SalePriceEntity> {
  entityClass = SalePriceEntity

  baseUrl = 'salePrice'

  async getByMaterialAndCustomer(materialId: number, customerId: number): Promise<SalePriceEntity | null> {
    const entity = new SalePriceEntity()
    entity.material = new MaterialEntity(materialId)
    entity.customer = new CustomerEntity(customerId)
    try {
      const json = await this.api('getByMaterialAndCustomer').callbackError().post(entity)
      return SalePriceEntity.fromJson(json)
    } catch (e) {
      return null
    }
  }
}
