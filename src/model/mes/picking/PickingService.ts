import type { PickingDetailEntity } from './PickingDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { PickingEntity } from './PickingEntity'

export class PickingService extends AbstractBaseBillService<PickingDetailEntity, PickingEntity> {
  entityClass = PickingEntity

  baseUrl = 'picking'
}
