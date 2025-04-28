import type { MoveDetailEntity } from './MoveDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { MoveEntity } from './MoveEntity'

export class MoveService extends AbstractBaseBillService<MoveDetailEntity, MoveEntity> {
  entityClass = MoveEntity

  baseUrl = 'move'
}
