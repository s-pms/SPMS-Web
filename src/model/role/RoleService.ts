import { AbstractBaseService } from '@/base/AbstractBaseService'
import { RoleEntity } from './RoleEntity'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { MenuEntity } from '../menu/MenuEntity'
import { PermissionEntity } from '../permission/PermissionEntity'

/**
 * # 角色接口服务
 * @author Hamm
 */
export class RoleService extends AbstractBaseService<RoleEntity> {
  baseUrl = 'role'

  entityClass = RoleEntity

  /**
   * # 为角色授权菜单
   * @param id 角色ID
   * @param menuList 菜单列表
   */
  async authorizeMenu(id: number, menuList: MenuEntity[]): Promise<void> {
    const role = new RoleEntity(id)
    role.menuList = menuList.map((item) => new MenuEntity(item.id))
    await this.api('authorizeMenu').post(role)
    AirNotification.success('授权菜单成功')
  }

  /**
   * # 为角色授权权限
   * @param id 角色ID
   * @param permissionList 权限列表
   */
  async authorizePermission(id: number, permissionList: PermissionEntity[]): Promise<void> {
    const role = new RoleEntity(id)
    role.permissionList = permissionList.map((item) => new PermissionEntity(item.id))
    await this.api('authorizePermission').post(role)
    AirNotification.success('授权权限成功')
  }
}
