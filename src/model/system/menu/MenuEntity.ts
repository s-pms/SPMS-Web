import {
  ClassName,
  FieldName, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { IMenu } from '@/airpower/interface/IMenu'
import { OrderNumberDictionary } from '@/model/common/OrderNumberDictionary'

/**
 * # 菜单
 * @author Hamm
 */
@EntityConfig({
  addChildPermission: 'add',
})
@ClassName('菜单')
export class MenuEntity extends BaseEntity implements IMenu {
  /**
   * # 菜单名称
   */
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @FieldName('菜单名称') name!: string

  /**
   * # 菜单路径
   */
  @TableField({
    copyField: true,
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @FieldName('菜单路径') path!: string

  /**
   * # 菜单图标
   */
  @FormField()
  @Type(String)
  @FieldName('菜单图标') icon!: string

  /**
   * # 组件地址
   */
  @TableField({
    copyField: true,
  })
  @FormField()
  @Type(String)
  @FieldName('组件地址') component!: string

  /**
   * # 排序编号
   */
  @FormField({
    dictionary: OrderNumberDictionary,
    filterable: true,
    requiredNumber: true,
    defaultValue: 1,
  })
  @TableField({
    width: 100,
  })
  @Type(Number)
  @FieldName('排序编号') orderNo!: number

  /**
   * # 父菜单ID
   */
  @FieldName('父级ID') parentId!: number

  /**
   * # 子菜单列表
   */
  // eslint-disable-next-line no-use-before-define
  @Type(MenuEntity, true) children!: this[]

  /**
   * # 父菜单
   */
  // eslint-disable-next-line no-use-before-define
  @Type(MenuEntity) parent!: this

  @TableField({
    removed: true,
  })
  declare createTime: number

  @TableField({
    removed: true,
  })
  declare isDisabled: boolean
}
