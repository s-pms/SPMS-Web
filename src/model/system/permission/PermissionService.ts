import { AbstractBaseService } from '@/base/AbstractBaseService'
import { PermissionEntity } from './PermissionEntity'

/**
 * # 权限接口服务
 * @author Hamm
 */
export class PermissionService extends AbstractBaseService<PermissionEntity> {
  baseUrl = 'permission'

  entityClass = PermissionEntity
}
