import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PlanDetailEntity } from './PlanDetailEntity'

export class PlanDetailService extends AbstractBaseService<PlanDetailEntity> {
  entityClass = PlanDetailEntity

  baseUrl = 'planDetail'
}
