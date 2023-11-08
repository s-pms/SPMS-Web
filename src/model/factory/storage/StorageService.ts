import { AbstractBaseService } from '@/base/AbstractBaseService'
import { StorageEntity } from './StorageEntity'

export class StorageService extends AbstractBaseService<StorageEntity> {
  baseUrl = 'storage'

  entityClass = StorageEntity
}
