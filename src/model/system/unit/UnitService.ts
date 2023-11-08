import { AbstractBaseService } from '@/base/AbstractBaseService'
import { UnitEntity } from './UnitEntity'

export class UnitService extends AbstractBaseService<UnitEntity> {
  entityClass = UnitEntity

  baseUrl = 'unit'
}
