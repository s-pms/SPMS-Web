import { AbstractBaseService } from '@/base/AbstractBaseService'
import { InputDetailEntity } from './InputDetailEntity'

export class InputDetailService extends AbstractBaseService<InputDetailEntity> {
  entityClass = InputDetailEntity

  baseUrl = 'inputDetail'
}
