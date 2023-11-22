import { AbstractBaseBillDetailService } from '@/base/bill/AbstractBaseBillDetailService'
import { OutputDetailEntity } from './OutputDetailEntity'

export class OutputDetailService extends AbstractBaseBillDetailService<OutputDetailEntity> {
  entityClass = OutputDetailEntity

  baseUrl = 'outputDetail'
}
