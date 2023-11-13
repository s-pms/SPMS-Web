import { AbstractBaseBillService } from '@/base/bill/AbstractBaseBillService'
import { InputEntity } from './InputEntity'
import { InputDetailEntity } from './InputDetailEntity'

export class InputService extends AbstractBaseBillService<InputDetailEntity, InputEntity> {
  entityClass = InputEntity

  baseUrl = 'input'
}
