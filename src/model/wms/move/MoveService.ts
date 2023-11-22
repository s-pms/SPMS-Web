import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { MoveEntity } from './MoveEntity'
import { MoveDetailEntity } from './MoveDetailEntity'

export class MoveService extends AbstractBaseBillService<MoveDetailEntity, MoveEntity> {
  entityClass = MoveEntity

  baseUrl = 'move'
}
