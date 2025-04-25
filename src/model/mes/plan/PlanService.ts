import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { PlanDetailEntity } from './PlanDetailEntity'
import { PlanEntity } from './PlanEntity'

export class PlanService extends AbstractBaseBillService<PlanDetailEntity, PlanEntity> {
  entityClass = PlanEntity

  baseUrl = 'plan'
}
