import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MaterialEntity } from './MaterialEntity'

export class MaterialService extends AbstractBaseService<MaterialEntity> {
  entityClass = MaterialEntity

  baseUrl = 'material'
}
