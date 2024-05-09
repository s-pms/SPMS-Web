import {
  Field,
  Model,
  Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'

/**
 * # 角色
 * @author Hamm
 */
@EntityConfig({
})
@Model('角色')
export class RoleEntity extends BaseEntity {
  /**
   * # 角色名称
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Type(String)
  @Field('角色名称') name!: string

  /**
   * # 角色编码
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    placeholder: '不填按编码规则自动生成',
  })
  @Type(String)
  @Field('角色编码') code!: string

  /**
   * # 菜单列表
   */
  @Type(MenuEntity, true) menuList!: MenuEntity[]

  /**
   * # 权限列表
   */
  @Type(PermissionEntity, true) permissionList!: PermissionEntity[]
}
