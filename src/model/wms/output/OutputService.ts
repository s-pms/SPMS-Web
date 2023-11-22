import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { OutputEntity } from './OutputEntity'
import { OutputDetailEntity } from './OutputDetailEntity'

export class OutputService extends AbstractBaseBillService<OutputDetailEntity, OutputEntity> {
  entityClass = OutputEntity

  baseUrl = 'output'
}
