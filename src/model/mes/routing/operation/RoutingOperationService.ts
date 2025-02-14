import { AbstractBaseService } from '@/base/AbstractBaseService'
import { RoutingOperationEntity } from '@/model/mes/routing/operation/RoutingOperationEntity'

export class RoutingOperationService extends AbstractBaseService<RoutingOperationEntity> {
  baseUrl = 'routingOperation'

  entityClass = RoutingOperationEntity
}
