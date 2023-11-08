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
import { ITree } from '@/airpower/interface/ITree'
import { PermissionSystemDictionary } from './PermissionSystemDictionary'

/**
 * # 权限
 * @author Hamm
 */
@EntityConfig()
@ClassName('权限')
export class PermissionEntity extends BaseEntity implements ITree {
  /**
   * # 权限名称
   */
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @FieldName('权限名称') name!: string

  /**
   * # 权限唯一标识
   */
  @TableField({
    forceShow: true,
    copyField: true,
  })
  @FormField({
    requiredString: '请输入权限标识...',
  })
  @FieldName('权限标识') identity!: string

  /**
   * # 权限类别
   */
  @Dictionary(PermissionSystemDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @FieldName('类别') isSystem!: boolean

  /**
   * # 父权限ID
   */
  @FieldName('父级ID') parentId!: number

  /**
   * # 子权限列表
   */
  // eslint-disable-next-line no-use-before-define
  @Type(PermissionEntity, true) children!: this[]

  /**
   * # 父权限
   */
  // eslint-disable-next-line no-use-before-define
  @Type(PermissionEntity) parent!: this

  @TableField({
    removed: true,
  })
  declare createTime: number

  @TableField({
    removed: true,
  })
  declare isDisabled: boolean
}
