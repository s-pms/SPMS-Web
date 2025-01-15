import { AbstractBaseService } from '@/base/AbstractBaseService'
import { RoutingEntity } from './RoutingEntity'

export class RoutingService extends AbstractBaseService<RoutingEntity> {
  baseUrl = 'routing'

  entityClass = RoutingEntity
}

3
