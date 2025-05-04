import type { IPayload } from '@airpower/web'
import { BaseEntity } from '@/base/BaseEntity'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { Field, Form, Model, Search, Table, Type } from '@airpower/web'

/**
 * # 角色
 * @author Hamm.cn
 */

@Model({
  label: '角色',
})
export class RoleEntity extends BaseEntity implements IPayload {
  getPayloadLabel() {
    return this.name
  }

  /**
   * ### 角色名称
   */
  @Table({
    force: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '角色名称',
  })
  name!: string

  /**
   * ### 角色编码
   */
  @Table({
    force: true,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Field({
    label: '角色编码',
  })
  code!: string

  /**
   * ### 菜单列表
   */
  @Field({})
  @Type(MenuEntity, true)
  menuList!: MenuEntity[]

  /**
   * ### 权限列表
   */
  @Field({})
  @Type(PermissionEntity, true)
  permissionList!: PermissionEntity[]
}
