import { AbstractBaseService } from '@/base/AbstractBaseService'
import { LogEntity } from './LogEntity'

export class LogService extends AbstractBaseService<LogEntity> {
  entityClass = LogEntity

  baseUrl = 'log'
}
