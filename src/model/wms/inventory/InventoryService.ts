import { InventoryEntity } from './InventoryEntity'
import { AbstractBaseService } from '@/base/AbstractBaseService'

export class InventoryService extends AbstractBaseService<InventoryEntity> {
  entityClass = InventoryEntity

  baseUrl = 'inventory'
}
