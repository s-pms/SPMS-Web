import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { OutputDetailEntity } from './OutputDetailEntity'
import { OutputEntity } from './OutputEntity'

export class OutputService extends AbstractBaseBillService<OutputDetailEntity, OutputEntity> {
  entityClass = OutputEntity

  baseUrl = 'output'
}
