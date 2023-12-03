import { AbstractBaseService } from '@/base/AbstractBaseService'
import { CollectionEntity } from './CollectionEntity'

export class CollectionService extends AbstractBaseService<CollectionEntity> {
  entityClass = CollectionEntity

  baseUrl = 'collection'
}
