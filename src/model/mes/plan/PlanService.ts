import type { PlanDetailEntity } from './PlanDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { PlanEntity } from './PlanEntity'

export class PlanService extends AbstractBaseBillService<PlanDetailEntity, PlanEntity> {
  entityClass = PlanEntity

  baseUrl = 'plan'
}
