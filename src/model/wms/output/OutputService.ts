import type { OutputDetailEntity } from './OutputDetailEntity'
import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { OutputEntity } from './OutputEntity'

export class OutputService extends AbstractBaseBillService<OutputDetailEntity, OutputEntity> {
  entityClass = OutputEntity

  baseUrl = 'output'
}
