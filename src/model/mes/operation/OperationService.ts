import { AbstractBaseService } from '@/base/AbstractBaseService'
import { OperationEntity } from './OperationEntity'

export class OperationService extends AbstractBaseService<OperationEntity> {
  baseUrl = 'operation'

  entityClass = OperationEntity
}
