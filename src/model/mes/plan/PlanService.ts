import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { PlanDetailEntity } from './PlanDetailEntity'
import { PlanEntity } from './PlanEntity'

export class PlanService extends AbstractBaseBillService<PlanDetailEntity, PlanEntity> {
  entityClass = PlanEntity

  baseUrl = 'plan'
}
