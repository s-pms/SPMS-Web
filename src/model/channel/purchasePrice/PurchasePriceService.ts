import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PurchasePriceEntity } from './PurchasePriceEntity'
import { MaterialEntity } from '@/model/asset/material/MaterialEntity'
import { SupplierEntity } from '../supplier/SupplierEntity'

export class PurchasePriceService extends AbstractBaseService<PurchasePriceEntity> {
  entityClass = PurchasePriceEntity

  baseUrl = 'purchasePrice'

  async getByMaterialAndSupplier(materialId: number, supplierId: number): Promise<PurchasePriceEntity | null> {
    const entity = new PurchasePriceEntity()
    entity.material = new MaterialEntity(materialId)
    entity.supplier = new SupplierEntity(supplierId)
    try {
      return this.api('getByMaterialAndSupplier')
        .callbackError()
        .request(entity, PurchasePriceEntity)
    } catch (e) {
      return null
    }
  }
}
