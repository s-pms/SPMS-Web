import { AbstractBaseService } from '@/base/AbstractBaseService'
import { ParameterEntity } from './ParameterEntity'

export class ParameterService extends AbstractBaseService<ParameterEntity> {
  entityClass = ParameterEntity

  baseUrl = 'parameter'
}
