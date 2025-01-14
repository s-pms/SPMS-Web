import { AbstractBaseService } from '@/base/AbstractBaseService'
import { ConfigEntity } from './ConfigEntity'

/**
 * # 系统参数服务
 *
 * @author Hamm.cn
 */
export class ConfigService extends AbstractBaseService<ConfigEntity> {
  baseUrl = 'config'

  entityClass = ConfigEntity
}
