import { AbstractBaseService } from '@/base/AbstractBaseService'
import { InventoryEntity } from './InventoryEntity'

export class InventoryService extends AbstractBaseService<InventoryEntity> {
  entityClass = InventoryEntity

  baseUrl = 'inventory'
}
