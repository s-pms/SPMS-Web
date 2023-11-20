import { InputDetailEntity } from './InputDetailEntity'
import { AbstractBaseBillDetailService } from '@/base/bill/AbstractBaseBillDetailService'

export class InputDetailService extends AbstractBaseBillDetailService<InputDetailEntity> {
  entityClass = InputDetailEntity

  baseUrl = 'inputDetail'
}
