import {
  ClassName,
  FieldName, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { MenuEntity } from '@/model/system/menu/MenuEntity'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'

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
   * # 角色编码
   */
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    placeholder: '不填按编码规则自动生成',
  })
  @Type(String)
  @FieldName('角色编码') code!: string

  /**
   * # 菜单列表
   */
  @Type(MenuEntity, true) menuList!: MenuEntity[]

  /**
   * # 权限列表
   */
  @Type(PermissionEntity, true) permissionList!: PermissionEntity[]
}
