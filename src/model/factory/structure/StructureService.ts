import { AbstractBaseService } from '@/base/AbstractBaseService'
import { StructureEntity } from './StructureEntity'

export class StructureService extends AbstractBaseService<StructureEntity> {
  baseUrl = 'structure'

  entityClass = StructureEntity
}
