import { AbstractBaseService } from '@/base/AbstractBaseService'
import { OpenLogEntity } from './OpenLogEntity'

export class OpenLogService extends AbstractBaseService<OpenLogEntity> {
  entityClass = OpenLogEntity

  baseUrl = 'openLog'
}
