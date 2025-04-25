import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { MoveDetailEntity } from './MoveDetailEntity'
import { MoveEntity } from './MoveEntity'

export class MoveService extends AbstractBaseBillService<MoveDetailEntity, MoveEntity> {
  entityClass = MoveEntity

  baseUrl = 'move'
}
