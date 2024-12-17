import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { IMenu } from '@/airpower/interface/IMenu'
import { OrderNumberDictionary } from '@/model/common/OrderNumberDictionary'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

/**
 * # 菜单
 * @author Hamm
 */
@Model({
  label: '菜单',
})
export class MenuEntity extends BaseEntity implements IMenu {
  /**
   * ### 菜单名称
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Field({
    label: '菜单名称',
  })
    name!: string

  /**
   * ### 菜单路径
   */
  @Table({
    copyField: true,
    forceShow: true,
  })
  @Form({
    requiredString: true,
  })
  @Field({
    label: '菜单路径',
  })
    path!: string

  /**
   * ### 菜单图标
   */
  @Form()
  @Field({
    label: '菜单图标',
  })
    icon!: string

  /**
   * ### 组件地址
   */
  @Table({
    copyField: true,
  })
  @Form()
  @Field({
    label: '组件地址',
  })
    component!: string

  /**
   * ### 排序编号
   */
  @Form({
    dictionary: OrderNumberDictionary,
    filterable: true,
    requiredNumber: true,
    defaultValue: 1,
  })
  @Table({
    width: 100,
  })
  @Field({
    label: '排序编号',
    type: Number,
  })
    orderNo!: number

  /**
   * ### 父菜单ID
   */
  @Field({
    label: '父级ID',
  })
    parentId!: number

  /**
   * ### 子菜单列表
   */
  @Field({
    // eslint-disable-next-line no-use-before-define
    type: MenuEntity,
    array: true,
  })
    children!: this[]

  /**
   * ### 父菜单
   */
  @Field({
    // eslint-disable-next-line no-use-before-define
    type: MenuEntity,
  })
    parent!: this

  @Table({
    removed: true,
  })
  declare createTime: number

  @Table({
    removed: true,
  })
  declare isDisabled: boolean
}
