import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MoveDetailEntity } from './MoveDetailEntity'

export class MoveDetailService extends AbstractBaseService<MoveDetailEntity> {
  entityClass = MoveDetailEntity

  baseUrl = 'inputDetail'
}
