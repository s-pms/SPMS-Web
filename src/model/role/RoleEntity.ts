import {
  ClassName,
  Dictionary,
  FieldName, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleSystemDictionary } from './RoleSystemDictionary'
import { MenuEntity } from '../menu/MenuEntity'
import { PermissionEntity } from '../permission/PermissionEntity'

/**
 * # 角色
 * @author Hamm
 */
@EntityConfig({
})
@ClassName('角色')
export class RoleEntity extends BaseEntity {
  /**
   * # 角色名称
   */
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @FieldName('角色名称') name!: string

  /**
   * # 角色类别
   */
  @Dictionary(RoleSystemDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @FieldName('类别') isSystem!: boolean

  /**
   * # 菜单列表
   */
  @Type(MenuEntity, true) menuList!: MenuEntity[]

  /**
   * # 权限列表
   */
  @Type(PermissionEntity, true) permissionList!: PermissionEntity[]
}
