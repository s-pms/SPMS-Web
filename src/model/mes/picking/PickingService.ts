import { PickingDetailEntity } from './PickingDetailEntity'
import { PickingEntity } from './PickingEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'

export class PickingService extends AbstractBaseBillService<PickingDetailEntity, PickingEntity> {
  entityClass = PickingEntity

  baseUrl = 'picking'
}
