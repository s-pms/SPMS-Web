import { AbstractBaseBillDetailService } from '@/base/bill/AbstractBaseBillDetailService'
import { InputDetailEntity } from './InputDetailEntity'

export class InputDetailService extends AbstractBaseBillDetailService<InputDetailEntity> {
  entityClass = InputDetailEntity

  baseUrl = 'inputDetail'
}
