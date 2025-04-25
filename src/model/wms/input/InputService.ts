import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import type { InputDetailEntity } from './InputDetailEntity'
import { InputEntity } from './InputEntity'

export class InputService extends AbstractBaseBillService<InputDetailEntity, InputEntity> {
  entityClass = InputEntity

  baseUrl = 'input'
}
